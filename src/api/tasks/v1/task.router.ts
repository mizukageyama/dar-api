import express, { Request, Response } from 'express';
import {
  createTask,
  deleteTask,
  getTasks,
  getTask,
  updateTask,
} from './task.controller';
import { verifyAccessToken } from '../../../middlewares/access.token.middleware';
const router = express.Router();
router.use(express.json());

router.get('/', verifyAccessToken, getTasks);
router.get('/:id', verifyAccessToken, getTask);
router.post('/', verifyAccessToken, createTask);
router.patch('/:id', verifyAccessToken, updateTask);
router.delete('/:id', verifyAccessToken, deleteTask);

export default router;
