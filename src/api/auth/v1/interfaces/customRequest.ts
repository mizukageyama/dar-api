import { Request } from 'express';

interface SignInRequest extends Request {
  email?: string;
  firstName?: string;
  lastName?: string;
  profileUrl?: string;
}

export { SignInRequest };
