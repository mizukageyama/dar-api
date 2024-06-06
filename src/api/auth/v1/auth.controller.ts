import { Response, Request } from 'express';
import User from '../../users/v1/user.model';
import Role from '../../users/v1/role.model';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { plainToClass } from 'class-transformer';
import { UserDTO } from '../../users/v1/user.dto';

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

export async function generateTestToken(req: Request, res: Response) {
  const userId = '665ab020457c9f5c733dbeba';
  const userRole = 'free';

  // const userId = '665ab8be6d53e2f4a54f44d5';
  // const userRole = 'admin';

  const { password = '' } = req.body;

  if (password !== process.env.TEST_TOKEN_PASSWORD!) {
    res.status(400).json({ error: 'Wrong password.' });
  }

  const accessToken = jwt.sign(
    { userId, userRole },
    process.env.JWT_TOKEN_SECRET!,
    {
      expiresIn: '20m',
    }
  );

  res.status(200).json({ accessToken });
}

export async function login(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).populate('role');

    if (user) {
      const userId = user._id.toString();
      const userRole = user.role!._id.toString();

      const accessToken = generateAccessToken(userId, userRole);
      const refreshToken = generateRefreshToken(userId, userRole);

      const userDTO = plainToClass(UserDTO, user, {
        excludeExtraneousValues: true,
      });

      res.status(200).json({ data: userDTO, accessToken, refreshToken });
    } else {
      res.status(404).json({ error: 'You are not registered' });
    }
  } catch (error) {
    console.error('Error login: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function register(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, firstName, lastName } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ error: `User with email ${email} already exists.` });
    }

    const defaultRole = await Role.findOne({ name: 'free' });
    if (!defaultRole) {
      return res.status(500).json({
        error: 'Internal server error: Default role not found in the database.',
      });
    }

    const newUser = await User.create({
      email,
      firstName,
      lastName,
      role: defaultRole._id,
    });

    const populatedUser = await newUser.populate('role');

    const userId = newUser._id.toString();
    const userRole = populatedUser.role!._id.toString();

    const accessToken = generateAccessToken(userId, userRole);
    const refreshToken = generateRefreshToken(userId, userRole);

    const userDTO = plainToClass(UserDTO, populatedUser, {
      excludeExtraneousValues: true,
    });

    res.status(200).json({ data: userDTO, accessToken, refreshToken });
  } catch (error) {
    console.error('Error registering user: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
