import { Request, Response } from 'express';
import User from './user.model';
import Role from './role.model';
import { PaginationQueryWithSearchKey } from '../../../helpers/paginationQuery';

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

    res.status(200).json({ data: users });
  } catch (error) {
    console.error('Error getting user: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { userId, userRole } = req.body;

    let existingUser = await User.findById(id);
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: `User with id of ${id} does not exist.` });
    }

    if (userRole !== 'admin') {
      if (existingUser._id !== userId) {
        return res
          .status(403)
          .json({ message: `You are unauthorized to view other user's task.` });
      }
    }

    res.status(200).json({ data: existingUser });
  } catch (error) {
    console.error('Error getting task: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const { email, firstName, lastName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: `User with email of ${email} already exists.` });
    }

    const createdUser = await User.create({ email, firstName, lastName });
    return res.status(201).json({ data: createdUser });
  } catch (error) {
    console.error('Error creating user: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { userId, userRole, firstName, lastName } = req.body;

    let existingUser = await User.findById(id);
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: `User with id of ${id} does not exist.` });
    }

    if (userRole !== 'admin') {
      if (existingUser._id !== userId) {
        return res
          .status(403)
          .json({ message: `You are unauthorized to update other user.` });
      }
    }

    existingUser.firstName = firstName;
    existingUser.lastName = lastName;

    await existingUser.updateOne();

    return res.status(200).json({ data: existingUser });
  } catch (error) {
    console.error('Error updating user: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateUserToAdmin(req: Request, res: Response) {
  try {
    const { id } = req.params;

    let existingUser = await User.findById(id);

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: `User with id of ${id} does not exist.` });
    }

    // ! existingUser.role! = 2;
    await existingUser.updateOne();

    return res.status(200).json({ data: existingUser });
  } catch (error) {
    console.error('Error updating user: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: `User with id of ${id} does not exist.` });
    }

    return res.status(204).end();
  } catch (error) {
    console.error('Error deleting user: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
