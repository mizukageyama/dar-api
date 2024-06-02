import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export async function verifyAdminAccess(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userRole } = req.body;

  if (userRole !== 'admin') {
    return res
      .status(403)
      .send({ message: 'Unauthorize to access administrative operations.' });
  }

  next();
}
