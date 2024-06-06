import { Request, Response } from 'express';
import User from './user.model';
import Role from './role.model';
import { PaginationQueryWithSearchKey } from '../../../helpers/paginationQuery';
import { validationResult } from 'express-validator';
import { plainToClass } from 'class-transformer';
import { UserDTO } from './user.dto';

export async function getUsers(
  req: Request<any, any, any, PaginationQueryWithSearchKey>,
  res: Response
) {
  try {
    const { searchKey, page = 1, pageSize = 10, sortOrder = 'asc' } = req.query;
    const skip = (page - 1) * pageSize;

    const query: any = searchKey
      ? {
          $or: [
            { firstName: { $regex: searchKey, $options: 'i' } },
            { lastName: { $regex: searchKey, $options: 'i' } },
          ],
        }
      : {};

    const users = await User.find(query)
      .sort({ lastName: sortOrder })
      .skip(skip)
      .limit(pageSize)
      .exec();

    const userDTOs = users.map((user) =>
      plainToClass(UserDTO, user, { excludeExtraneousValues: true })
    );

    res.status(200).json({ data: userDTOs });
  } catch (error) {
    console.error('Error getting user: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { userId, userRole } = req.body;

    let existingUser = await User.findById(id);
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: `User with id of ${id} does not exist.` });
    }

    if (userRole !== 'admin') {
      if (existingUser._id.toString() !== userId) {
        return res
          .status(403)
          .json({ message: `You are unauthorized to view other user's task.` });
      }
    }

    const userDTO = plainToClass(UserDTO, existingUser, {
      excludeExtraneousValues: true,
    });

    res.status(200).json({ data: userDTO });
  } catch (error) {
    console.error('Error getting task: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, firstName, lastName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: `User with email of ${email} already exists.` });
    }

    const defaultRole = await Role.findOne({ name: 'free' });
    if (!defaultRole) {
      return res.status(500).json({
        error: 'Internal server error: Default role not found in the database.',
      });
    }

    const createdUser = await User.create({
      email,
      firstName,
      lastName,
      role: defaultRole._id,
    });

    const userDTO = plainToClass(UserDTO, createdUser, {
      excludeExtraneousValues: true,
    });

    res.status(201).json({ data: userDTO });
  } catch (error) {
    console.error('Error creating user: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { userId, userRole, firstName, lastName } = req.body;

    let existingUser = await User.findById(id);
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: `User with id of ${id} does not exist.` });
    }

    if (userRole !== 'admin') {
      if (existingUser._id.toString() !== userId) {
        return res
          .status(403)
          .json({ message: `You are unauthorized to update other user.` });
      }
    }

    existingUser.firstName = firstName;
    existingUser.lastName = lastName;

    await existingUser.save();

    const userDTO = plainToClass(UserDTO, existingUser, {
      excludeExtraneousValues: true,
    });

    res.status(200).json({ data: userDTO });
  } catch (error) {
    console.error('Error updating user: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateUserToAdmin(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    let existingUser = await User.findById(id);

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: `User with id of ${id} does not exist.` });
    }

    const adminRole = await Role.findOne({ name: 'admin' });
    if (!adminRole) {
      return res
        .status(500)
        .json({ error: 'Admin role not found in the database.' });
    }

    existingUser.role! = adminRole._id;
    await existingUser.save();

    const userDTO = plainToClass(UserDTO, existingUser, {
      excludeExtraneousValues: true,
    });

    res.status(200).json({ data: userDTO });
  } catch (error) {
    console.error('Error updating user: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: `User with id of ${id} does not exist.` });
    }

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting user: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
