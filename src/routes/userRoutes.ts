import express, { Request, Response } from 'express';
const router = express.Router();
router.use(express.json());

/**
 * @swagger
 * tags:
 *   - name: Users
 *
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Returns a list of users
 *     tags:
 *       - Users
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
 *     responses:
 *       200:
 *         description: Successful response returning users.
 *
 *   post:
 *     summary: Create new user
 *     description: Returns created user details
 *     tags:
 *       - Users
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
 *
 * /users/{id}:
 *   patch:
 *     summary: Update existing user
 *     description: Returns updated user details
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
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
 *
 *   delete:
 *     summary: Delete existing user
 *     description: Returns success response upon successful deletion.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       204:
 *         description: Successful response deleting user.
 */

router.get('/', (req: Request, res: Response) => {
  res.json([]);
});

router.post('/', (req: Request, res: Response) => {
  res.json([]);
});

router.patch('/:id', (req: Request, res: Response) => {
  res.json('Updated');
});

router.delete('/:id', (req: Request, res: Response) => {
  res.json('Deleted');
});

export default router;
