import 'reflect-metadata';
import { Expose, Transform, Type } from 'class-transformer';
import { UserDTO } from '../../users/v1/user.dto';

export class NoteDTO {
  @Expose()
  @Transform((params) => params.obj._id)
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
