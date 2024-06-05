import { Request, Response } from 'express';
import Task from './task.model';
import Status from './status.model';
import { PaginationQueryWithSearchKey } from '../../../helpers/paginationQuery';

export async function getTasks(
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
            { remarks: { $regex: searchKey, $options: 'i' } },
          ],
        }
      : {};

    const tasks = await Task.find({ ...query, user: userId })
      .populate('user')
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(pageSize)
      .exec();

    res.status(200).json({ data: tasks });
  } catch (error) {
    console.error('Error getting tasks: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getTask(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    let existingTask = await Task.findById(id);
    if (!existingTask) {
      return res
        .status(404)
        .json({ message: `Task with id of ${id} does not exist.` });
    }

    if (existingTask.user._id !== userId) {
      return res
        .status(403)
        .json({ message: `You are unauthorized to view other user's task.` });
    }

    res.status(200).json({ data: existingTask });
  } catch (error) {
    console.error('Error getting task: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function createTask(req: Request, res: Response) {
  try {
    const { title, remarks = '', userId, status = 'notStarted' } = req.body;

    const defaultStatus = await Status.findOne({ name: status });
    if (!defaultStatus) {
      return res.status(500).json({
        error: `The status ${status} of task not found in the database.`,
      });
    }

    const createdTask = await Task.create({
      title,
      remarks,
      user: userId,
      status: defaultStatus._id,
    });

    res.status(201).json({ data: createdTask });
  } catch (error) {
    console.error('Error creating task: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateTask(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { title, userId, remarks = '', status = '' } = req.body;

    let existingTask = await Task.findById(id);
    if (!existingTask) {
      return res
        .status(404)
        .json({ message: `Task with id of ${id} does not exist.` });
    }

    if (existingTask.user._id !== userId) {
      return res
        .status(403)
        .json({ message: `You are unauthorized to update other user's task.` });
    }

    existingTask.title = title;

    if (remarks) {
      existingTask.remarks = remarks;
    }

    if (status) {
      const taskStatus = await Status.findOne({ name: status });
      if (!taskStatus) {
        return res.status(500).json({
          error: `The status ${status} of task not found in the database.`,
        });
      }
      existingTask.status = taskStatus._id;
    }

    await existingTask.updateOne();

    res.status(200).json({ data: existingTask });
  } catch (error) {
    console.error('Error updating task: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    let existingTask = await Task.findById(id);
    if (!existingTask) {
      return res
        .status(404)
        .json({ message: `Task with id of ${id} does not exist.` });
    }

    if (existingTask.user._id !== userId) {
      return res
        .status(403)
        .json({ message: `You are unauthorized to delete other user's task.` });
    }

    await existingTask.deleteOne();

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting task: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
