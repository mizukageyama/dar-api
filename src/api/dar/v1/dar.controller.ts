import { Request, Response } from 'express';
import { PaginationQueryWithDate } from '../../../helpers/paginationQuery';
import Task from '../../tasks/v1/task.model';
import User from '../../users/v1/user.model';
import { plainToClass } from 'class-transformer';
import { DarTaskDTO, TaskDTO } from '../../tasks/v1/task.dto';
import { UserDTO } from '../../users/v1/user.dto';

export async function getDar(
  req: Request<any, any, any, PaginationQueryWithDate>,
  res: Response
) {
  try {
    const { userId } = req.body;
    const { date = Date.now(), sortOrder = 'asc' } = req.params;

    const parsedDate = new Date(date);

    const startDate = new Date(parsedDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(parsedDate);
    endDate.setHours(23, 59, 59, 999);

    const query: any = date
      ? {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        }
      : {};

    const tasks = await Task.find({ ...query, user: userId })
      .populate(['user', 'status'])
      .sort({
        createdAt: sortOrder,
      });

    const taskDTOs = tasks.map((task) =>
      plainToClass(DarTaskDTO, task, { excludeExtraneousValues: true })
    );

    const user = await User.findById(userId);
    const userDTO = plainToClass(UserDTO, user, {
      excludeExtraneousValues: true,
    });

    res.status(200).json({
      data: {
        title: 'Daily Accomplishment Report',
        user: userDTO,
        date: startDate.toISOString().split('T')[0],
        accomplishment: taskDTOs,
      },
    });
  } catch (error) {
    console.error('Error getting dar: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
