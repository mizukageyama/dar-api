import { OAuth2Client } from 'google-auth-library';
import { NextFunction, Response } from 'express';
import { SignInRequest } from '../api/auth/v1/interfaces/customRequest';

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

async function verifyTokenId(
  req: SignInRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!authHeader || !token) {
    return res.status(401).json({ error: 'Unauthorized: Token missing' });
  }

  const ticket = await oAuth2Client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  if (payload) {
    req.email = payload['email'];
    req.firstName = payload['given_name'];
    req.lastName = payload['family_name'];
    req.profileUrl = payload['profile'];

    next();
  } else {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}

export default verifyTokenId;
