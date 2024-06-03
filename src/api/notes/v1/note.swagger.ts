/**
 * @swagger
 * tags:
 *   - name: Notes
 *
 * /api/notes:
 *   get:
 *     summary: Get all notes of user
 *     description: Returns a list of notes by user.
 *     tags:
 *       - Notes
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: query
 *         name: searchKey
 *         schema:
 *           type: string
 *         required: false
 *         description: Search keyword to filter notes
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
 *         description: Number of notes per page
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum:
 *            - asc
 *            - desc
 *         required: false
 *         description: Sort order of notes date created
 *     responses:
 *       200:
 *         description: Successful response returning user's notes.
 *       500:
 *         description: Internal server error.
 *
 *   post:
 *     summary: Create new note
 *     description: Returns created notes details
 *     tags:
 *       - Notes
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
 *               content:
 *                 type: string
 *             required:
 *               - content
 *     responses:
 *       201:
 *         description: Successful response returning created note.
 *       500:
 *         description: Internal server error.
 *
 * /api/notes/{id}:
 *   get:
 *     summary: Get note by id
 *     description: Return note details
 *     tags:
 *       - Notes
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Note Id
 *     responses:
 *       200:
 *         description: Successful response returning note.
 *       401:
 *         description: Access token is missing or invalid.
 *       404:
 *         description: Note does not exists.
 *       403:
 *         description: Unauthorized to access other user's note.
 *       500:
 *         description: Internal server error.
 *
 *   patch:
 *     summary: Update existing note
 *     description: Returns updated note details
 *     tags:
 *       - Notes
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Note Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *             required:
 *               - title
 *               - content
 *     responses:
 *       200:
 *         description: Successful response returning updated note.
 *       401:
 *         description: Access token is missing or invalid.
 *       404:
 *         description: Note does not exists.
 *       403:
 *         description: Unauthorized to update other user's note.
 *       500:
 *         description: Internal server error.
 *
 *   delete:
 *     summary: Delete existing note
 *     description: Returns success response upon successful deletion.
 *     tags:
 *       - Notes
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Note Id
 *     responses:
 *       204:
 *         description: Successful response deleting note.
 *       401:
 *         description: Access token is missing or invalid.
 *       404:
 *         description: Note does not exists.
 *       403:
 *         description: Unauthorized to delete other user's note.
 *       500:
 *         description: Internal server error.
 */
