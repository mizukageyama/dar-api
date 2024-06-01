import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthenticatedRequest } from '../helpers/authenticatedRequest';

module.exports = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .send({ message: 'Access token is missing or invalid.' });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_TOKEN_SECRET!
    ) as JwtPayload;

    req.userId = decoded.userId;
    next();
  } catch (error) {
    if ((error as { name?: string }).name === 'TokenExpiredError') {
      return res.status(401).send({ message: 'Access token expired.' });
    }
    res.status(401).send({ message: 'Invalid token.' });
  }
};
