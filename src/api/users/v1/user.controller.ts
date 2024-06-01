import { Request, Response } from 'express';
import User from './user.model';
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

export async function createUser(req: Request, res: Response) {
  try {
    const user = new User(req.body);
    const { email } = user;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: `User with email of ${email} already exists.` });
    }

    const createdUser = await User.create(user);
    return res.status(201).json({ data: createdUser });
  } catch (error) {
    console.error('Error creating user: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = new User(req.body);
    const { firstName, lastName } = user;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { firstName, lastName },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: `User with id of ${id} does not exist.` });
    }
    return res.status(200).json({ data: updatedUser });
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
