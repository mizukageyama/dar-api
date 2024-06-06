import { Request, Response } from 'express';
import Note from './note.model';
import { PaginationQueryWithSearchKey } from '../../../helpers/paginationQuery';
import { plainToClass } from 'class-transformer';
import { NoteDTO } from './note.dto';
import { validationResult } from 'express-validator';

export async function getNotes(
  req: Request<any, any, any, PaginationQueryWithSearchKey>,
  res: Response
) {
  try {
    const { userId } = req.body;
    const {
      searchKey,
      page = 1,
      pageSize = 10,
      sortOrder = 'desc',
    } = req.query;
    const skip = (page - 1) * pageSize;

    const query: any = searchKey
      ? {
          $or: [
            { title: { $regex: searchKey, $options: 'i' } },
            { content: { $regex: searchKey, $options: 'i' } },
          ],
        }
      : {};

    const notes = await Note.find({ ...query, user: userId })
      .populate('user')
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(pageSize)
      .exec();

    const noteDTOs = notes.map((note) =>
      plainToClass(NoteDTO, note, {
        excludeExtraneousValues: true,
      })
    );

    res.status(200).json({ data: noteDTOs });
  } catch (error) {
    console.error('Error getting notes: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getNote(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { userId } = req.body;

    let existingNote = await Note.findById(id).populate('user');
    if (!existingNote) {
      return res
        .status(404)
        .json({ message: `Note with id of ${id} does not exist.` });
    }

    if (existingNote.user._id.toString() !== userId) {
      return res
        .status(403)
        .json({ message: `You are unauthorized to view other user's note.` });
    }

    const noteDTO = plainToClass(NoteDTO, existingNote, {
      excludeExtraneousValues: true,
    });

    res.status(200).json({ data: noteDTO });
  } catch (error) {
    console.error('Error getting note: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function createNote(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, userId } = req.body;

    const createdNote = await Note.create({
      title,
      content,
      user: userId,
    });

    const populatedNote = await createdNote.populate('user');

    const noteDTO = plainToClass(NoteDTO, populatedNote, {
      excludeExtraneousValues: true,
    });

    return res.status(201).json({ data: noteDTO });
  } catch (error) {
    console.error('Error creating note: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateNote(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, content, userId } = req.body;

    let existingNote = await Note.findById(id).populate('user');
    if (!existingNote) {
      return res
        .status(404)
        .json({ message: `Note with id of ${id} does not exist.` });
    }

    if (existingNote.user._id.toString() !== userId) {
      return res
        .status(403)
        .json({ message: `You are unauthorized to update other user's note.` });
    }

    existingNote.title = title;
    existingNote.content = content;

    await existingNote.save();

    const noteDTO = plainToClass(NoteDTO, existingNote, {
      excludeExtraneousValues: true,
    });

    res.status(200).json({ data: noteDTO });
  } catch (error) {
    console.error('Error updating note: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteNote(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { userId } = req.body;

    let existingNote = await Note.findById(id);
    if (!existingNote) {
      return res
        .status(404)
        .json({ message: `Note with id of ${id} does not exist.` });
    }

    if (existingNote.user._id.toString() !== userId) {
      return res
        .status(403)
        .json({ message: `You are unauthorized to delete other user's note.` });
    }

    await existingNote.deleteOne();

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting note: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
