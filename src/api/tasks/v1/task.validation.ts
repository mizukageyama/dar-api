import { body, param } from 'express-validator';

export const taskIdParamValidation = [
  param('id', 'Task id is required.').notEmpty(),
];

export const createTaskValidation = [
  body('title', 'Title is required.').notEmpty(),
];

export const updateTaskValidation = [
  param('id', 'Task id is required.').notEmpty(),
  body('title', 'Title is required.').notEmpty(),
];
