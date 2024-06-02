import { Request, Response } from 'express';
import { PaginationQueryWithDate } from '../../../helpers/paginationQuery';
import Task from '../../tasks/v1/task.model';

export async function getDar(
  req: Request<any, any, any, PaginationQueryWithDate>,
  res: Response
) {
  try {
    const { userId } = req.body;
    const { date = Date.now(), sortOrder = 'asc' } = req.params;

    console.log(date);
    console.log(date.toLocaleDateString());

    const query: any = date
      ? {
          createdAt: date.toLocaleDateString(),
        }
      : {};

    const tasks = await Task.find({ ...query, user: userId })
      .populate('user')
      .sort({ createdAt: sortOrder });

    res.status(200).json({ data: tasks });
  } catch (error) {
    console.error('Error getting dar: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
