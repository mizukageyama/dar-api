/**
 * @swagger
 * tags:
 *   - name: Tasks
 *
 * /api/tasks:
 *   get:
 *     summary: Get all tasks of user
 *     description: Returns a list of task by user.
 *     tags:
 *       - Tasks
 *     security:
 *       - Authorization: []
 *     parameters:
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
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum:
 *            - asc
 *            - desc
 *         required: false
 *         description: Sort order of task date created
 *     responses:
 *       200:
 *         description: Successful response returning user's tasks.
 *       500:
 *         description: Internal server error.
 *
 *   post:
 *     summary: Create new task
 *     description: Returns created task details
 *     tags:
 *       - Tasks
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               remarks:
 *                 type: string
 *             required:
 *               - title
 *     responses:
 *       201:
 *         description: Successful response returning created taks.
 *       400:
 *         description: Bad request error.
 *       500:
 *         description: Internal server error.
 *
 * /api/tasks/{id}:
 *   get:
 *     summary: Get task by id
 *     description: Return task details
 *     tags:
 *       - Tasks
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task Id
 *     responses:
 *       200:
 *         description: Successful response returning task.
 *       400:
 *         description: Bad request error.
 *       401:
 *         description: Access token is missing or invalid.
 *       404:
 *         description: Task does not exists.
 *       403:
 *         description: Unauthorized to access other user's task.
 *       500:
 *         description: Internal server error.
 *
 *   patch:
 *     summary: Update existing task
 *     description: Returns updated task details
 *     tags:
 *       - Tasks
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               remarks:
 *                 type: string
 *               status:
 *                 type: string
 *             required:
 *               - title
 *               - remarks
 *               - status
 *     responses:
 *       200:
 *         description: Successful response returning updated task.
 *       400:
 *         description: Bad request error.
 *       401:
 *         description: Access token is missing or invalid.
 *       404:
 *         description: Task does not exists.
 *       403:
 *         description: Unauthorized to update other user's task.
 *       500:
 *         description: Internal server error.
 *
 *   delete:
 *     summary: Delete existing task
 *     description: Returns success response upon successful deletion.
 *     tags:
 *       - Tasks
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task Id
 *     responses:
 *       204:
 *         description: Successful response deleting task.
 *       400:
 *         description: Bad request error.
 *       401:
 *         description: Access token is missing or invalid.
 *       404:
 *         description: Task does not exists.
 *       403:
 *         description: Unauthorized to delete other user's task.
 *       500:
 *         description: Internal server error.
 */
