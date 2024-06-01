import { Request } from 'express';

interface LoginRequest extends Request {
  email?: string;
  firstName?: string;
  lastName?: string;
  profileUrl?: string;
}

export { LoginRequest };
