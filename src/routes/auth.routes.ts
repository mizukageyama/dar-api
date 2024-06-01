import express, { NextFunction, Request, Response } from 'express';
import { SignInRequest } from '../api/auth/v1/interfaces/customRequest';
import verifyTokenId from '../middlewares/verifyTokenId';
const router = express.Router();
router.use(express.json());

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *
 * /api/auth/login:
 *   post:
 *     summary: Sign in user
 *     description: Verifies the user token id. If user exists, returns
 *       response with access and refresh token. Else,registers the user.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           example: "Bearer <token>"
 *         required: true
 *         description: Bearer token for token id from Google OAuth
 *     responses:
 *       200:
 *         description: Successful response with access and refresh token.
 */

router.post(
  '/login',
  verifyTokenId,
  async (req: SignInRequest, res: Response, next: NextFunction) => {
    const { email } = req;

    const userExists = true;
    if (userExists) {
      //return access and refresh token
      res.send(`Token verified from: ${email}`);
    } else {
      next();
    }
  }
);

router.post('/protected/signup', (req: SignInRequest, res: Response) => {
  const { email, firstName, lastName, profileUrl } = req;

  try {
    //create new user
    //return access and refresh token
    res.send(`User created in: ${email}`);
  } catch (error) {
    res.status(500).send('Error creating user');
  }
});

export default router;
