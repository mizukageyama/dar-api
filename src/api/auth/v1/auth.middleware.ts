import { OAuth2Client } from 'google-auth-library';
import { Request, NextFunction, Response } from 'express';

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

async function verifyTokenId(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token missing.' });
  }

  try {
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: token,
      audience: process.env.IOS_APP_GOOGLE_CLIENT_ID!,
    });

    const payload = ticket.getPayload();
    if (payload) {
      const reqBodyWithEmail = { ...req.body, email: payload['email'] };
      req.body = reqBodyWithEmail;

      next();
    } else {
      return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
    }
  } catch (error) {
    console.error('Error: ', error);
    return res.status(401).json({
      error: 'Unauthorized: Unable to verify token or it has expired.',
    });
  }
}

export default verifyTokenId;
