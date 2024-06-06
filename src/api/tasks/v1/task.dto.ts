import 'reflect-metadata';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { UserDTO } from '../../users/v1/user.dto';

class StatusDTO {
  @Expose()
  _id!: string;

  @Expose()
  name!: string;
}

export class TaskDTO {
  @Expose()
  _id!: string;

  @Expose()
  title!: string;

  @Expose()
  remarks?: string;

  @Expose()
  @Type(() => StatusDTO)
  status!: StatusDTO;

  @Expose()
  @Type(() => UserDTO)
  user!: UserDTO;

  @Expose()
  createdAt!: Date;
}