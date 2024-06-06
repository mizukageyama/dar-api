import { Request, Response } from 'express';
import { PaginationQueryWithDate } from '../../../helpers/paginationQuery';
import Task from '../../tasks/v1/task.model';
import User from '../../users/v1/user.model';
import { plainToClass } from 'class-transformer';
import { TaskDTO } from '../../tasks/v1/task.dto';

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

    const tasks = await Task.find({ ...query, user: userId }).sort({
      createdAt: sortOrder,
    });

    const taskDTOs = tasks.map((task) =>
      plainToClass(TaskDTO, task, { excludeExtraneousValues: true })
    );

    const user = await User.findById(userId);

    res.status(200).json({
      data: {
        title: 'Daily Accomplishment Report',
        user: user,
        date: date,
        accomplishment: taskDTOs,
      },
    });
  } catch (error) {
    console.error('Error getting dar: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
