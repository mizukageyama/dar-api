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
 *     summary: Login user
 *     description: Verifies the user token id. If user exists, returns
 *       response with access and refresh token. Else, returns error message.
 *     tags:
 *       - Authentication
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: Successful response with access and refresh token.
 *       400:
 *         description: Bad request error.
 *       401:
 *         description: Token id is missing or invalid.
 *       500:
 *         description: Internal server error.
 *
 * /api/auth/register:
 *   post:
 *     summary: Register user
 *     description: Verifies the user token id. If user exists, returns
 *       error message. Else, registers the user and return response
 *       with access and refresh token.
 *     tags:
 *       - Authentication
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *             required:
 *               - firstName
 *               - lastName
 *     responses:
 *       200:
 *         description: Successful response with new user, access, and refresh token.
 *       400:
 *         description: User already exists.
 *       401:
 *         description: Token id is missing or invalid.
 *       500:
 *         description: Internal server error.
 */
