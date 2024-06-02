/**
 * @swagger
 * tags:
 *   - name: DAR
 *
 * /api/dar:
 *   get:
 *     summary: Get user DAR by date
 *     description: Returns a list of task accomplish within the day.
 *     tags:
 *       - DAR
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: date
 *           format: date
 *         required: true
 *         description: Date to filter daily accomplishment report.
 *     responses:
 *       200:
 *         description: Successful response returning dar.
 *       401:
 *         description: Access token is missing or invalid.
 *       500:
 *         description: Internal server error.
 */
