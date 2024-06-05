import express, { Request, Response } from 'express';
import {
  createTask,
  deleteTask,
  getTasks,
  getTask,
  updateTask,
} from './task.controller';
import { verifyAccessToken } from '../../../middlewares/access.token.middleware';
import {
  createTaskValidation,
  taskIdParamValidation,
  updateTaskValidation,
} from './task.validation';
const router = express.Router();
router.use(express.json());

router.get('/', verifyAccessToken, getTasks);
router.get('/:id', verifyAccessToken, taskIdParamValidation, getTask);
router.post('/', verifyAccessToken, createTaskValidation, createTask);
router.patch('/:id', verifyAccessToken, updateTaskValidation, updateTask);
router.delete('/:id', verifyAccessToken, taskIdParamValidation, deleteTask);

export default router;
