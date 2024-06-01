import express from 'express';
import verifyTokenId from '../middlewares/verifyTokenId';
import {
  generateTestToken,
  login,
  register,
} from '../api/auth/v1/auth.controller';

const router = express.Router();
router.use(express.json());

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *
 * /api/auth/test-token:
 *   get:
 *     summary: Get JWT token for testing purposes
 *     description: Returns jwt tokens for testing.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Successful response with access and refresh token.
 *
 * /api/auth/login:
 *   post:
 *     summary: Sign in user
 *     description: Verifies the user token id. If user exists, returns
 *       response with access and refresh token. Else,registers the user.
 *     tags:
 *       - Authentication
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: Successful response with access and refresh token.
 *       400:
 *         description: Bad request error
 *       401:
 *         description: Access token is missing or invalid
 *       500:
 *         description: Internal server error
 */

router.get('/test-token', generateTestToken);
router.post('/login', verifyTokenId, login, register);

export default router;
