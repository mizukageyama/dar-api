import 'reflect-metadata';
import { Expose, Transform, Type } from 'class-transformer';

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

class RoleDTO {
  @Expose()
  @Transform((params) => params.obj._id)
  _id!: string;

  @Expose()
  name!: string;
}

export class UserWithRoleDTO {
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

  @Expose()
  @Type(() => RoleDTO)
  role!: RoleDTO;
}
