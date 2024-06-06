import 'reflect-metadata';
import { Expose, Transform } from 'class-transformer';

export class UserDTO {
  @Expose()
  @Transform((params) => params.obj._id)
  _id!: string;

  @Expose()
  email!: string;

  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose()
  profileUrl?: string;
}
