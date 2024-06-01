import express, { Request, Response } from 'express';
const router = express.Router();
router.use(express.json());

/**
 * //@swagger
 * tags:
 *   - name: DAR
 *
 * /api/dar/{userId}:
 *   get:
 *     summary: Get all tasks as DAR
 *     description: Returns a list of task accomplish within the day.
 *     tags:
 *       - DAR
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Search keyword to filter users
 *     responses:
 *       200:
 *         description: Successful response returning dar.
 */

router.get('/:userId', (req: Request, res: Response) => {
  res.json([]);
});

export default router;
