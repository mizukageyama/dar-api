import 'reflect-metadata';
import { Expose, Type } from 'class-transformer';
import { UserDTO } from '../../users/v1/user.dto';

export class TaskDTO {
  @Expose()
  _id!: string;

  @Expose()
  title!: string;

  @Expose()
  content!: string;

  @Expose()
  @Type(() => UserDTO)
  user!: UserDTO;

  @Expose()
  createdAt!: Date;
}
