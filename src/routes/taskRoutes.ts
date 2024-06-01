import express, { Request, Response } from 'express';
const router = express.Router();
router.use(express.json());

/**
 * //@swagger
 * tags:
 *   - name: Tasks
 *
 * /tasks/{userId}:
 *   get:
 *     summary: Get all tasks of user
 *     description: Returns a list of task by user.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *       - in: query
 *         name: searchKey
 *         schema:
 *           type: string
 *         required: false
 *         description: Search keyword to filter tasks
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
 *         description: Number of tasks per page
 *     responses:
 *       200:
 *         description: Successful response returning user's tasks.
 */

router.get('/:userId', (req: Request, res: Response) => {
  res.json([]);
});

export default router;
