import { Request, Response, NextFunction } from 'express';
import { LoginRequest } from './interfaces/loginRequest';
import User from '../../users/v1/user.model';
import jwt from 'jsonwebtoken';

function generateAccessToken(userId: string, userRole: string) {
  return jwt.sign({ userId, userRole }, process.env.JWT_TOKEN_SECRET!, {
    expiresIn: '1hr',
  });
}

function generateRefreshToken(userId: string, userRole: string) {
  return jwt.sign({ userId, userRole }, process.env.JWT_TOKEN_SECRET!, {
    expiresIn: '7d',
  });
}

export async function generateTestToken(req: LoginRequest, res: Response) {
  const userId = '665ab020457c9f5c733dbeba';
  const userRole = 'free';

  const accessToken = jwt.sign(
    { userId, userRole },
    process.env.JWT_TOKEN_SECRET!,
    {
      expiresIn: '20m',
    }
  );

  res.status(200).json({ accessToken });
}

export async function login(
  req: LoginRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req;
    const user = await User.findOne({ email });

    if (user) {
      const userId = user._id.toString();
      const userRole = user.role!;

      const accessToken = generateAccessToken(userId, userRole);
      const refreshToken = generateRefreshToken(userId, userRole);

      res.status(200).json({ data: user, accessToken, refreshToken });
    } else {
      next();
    }
  } catch (error) {
    console.error('Error login: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function register(req: LoginRequest, res: Response) {
  try {
    const { email, firstName, lastName, profileUrl } = req;

    const newUser = await User.create({
      email,
      firstName,
      lastName,
      profileUrl,
    });

    const userId = newUser._id.toString();
    const userRole = newUser.role!;

    const accessToken = generateAccessToken(userId, userRole);
    const refreshToken = generateRefreshToken(userId, userRole);

    res.status(200).json({ data: newUser, accessToken, refreshToken });
  } catch (error) {
    console.error('Error registering user: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
