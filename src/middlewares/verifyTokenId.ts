import { OAuth2Client } from 'google-auth-library';
import { NextFunction, Response } from 'express';
import { LoginRequest } from '../api/auth/v1/interfaces/loginRequest';

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

async function verifyTokenId(
  req: LoginRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token missing.' });
  }

  try {
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: token,
      audience: process.env.IOS_GOOGLE_CLIENT_ID!,
    });

    const payload = ticket.getPayload();
    if (payload) {
      req.email = payload['email'];
      req.firstName = payload['given_name'];
      req.lastName = payload['family_name'];
      req.profileUrl = payload['profile'];

      next();
    } else {
      return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
    }
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ error: 'Unable to verify id token.' });
  }
}

export default verifyTokenId;
