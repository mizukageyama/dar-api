/**
 * @swagger
 * tags:
 *   - name: Users
 *
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Returns a list of users
 *     tags:
 *       - Users
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: query
 *         name: searchKey
 *         schema:
 *           type: string
 *         required: false
 *         description: Search keyword to filter users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of users per page
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum:
 *            - asc
 *            - desc
 *         required: false
 *         description: Sort order of user's last name
 *     responses:
 *       200:
 *         description: Successful response returning users.
 *       401:
 *         description: Access token is missing or invalid.
 *       403:
 *         description: Unauthorized to access administrative actions.
 *       500:
 *         description: Internal server error.
 *
 *   post:
 *     summary: Create new user
 *     description: Returns created user details
 *     tags:
 *       - Users
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
 *               email:
 *                 type: string
 *                 format: email
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *     responses:
 *       201:
 *         description: Successful response returning created user.
 *       401:
 *         description: Access token is missing or invalid.
 *       403:
 *         description: Unauthorized to access administrative actions.
 *       500:
 *         description: Internal server error.
 *
 * /api/users/{id}:
 *   get:
 *     summary: Get user by id
 *     description: Return user details
 *     tags:
 *       - Users
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User Id
 *     responses:
 *       200:
 *         description: Successful response returning user.
 *       401:
 *         description: Access token is missing or invalid.
 *       404:
 *         description: User does not exists.
 *       403:
 *         description: Unauthorized to access other user.
 *       500:
 *         description: Internal server error.
 *
 *   patch:
 *     summary: Update existing user
 *     description: Returns updated user details
 *     tags:
 *       - Users
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User Id
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
 *         description: Successful response returning updated user.
 *       401:
 *         description: Access token is missing or invalid.
 *       404:
 *         description: User does not exists.
 *       403:
 *         description: Unauthorized to update other user.
 *       500:
 *         description: Internal server error.
 *
 *   delete:
 *     summary: Delete existing user
 *     description: Returns success response upon successful deletion.
 *     tags:
 *       - Users
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User Id
 *     responses:
 *       204:
 *         description: Successful response deleting user.
 *       401:
 *         description: Access token is missing or invalid.
 *       404:
 *         description: User does not exists.
 *       403:
 *         description: Unauthorized to access administrative actions.
 *       500:
 *         description: Internal server error.
 */
