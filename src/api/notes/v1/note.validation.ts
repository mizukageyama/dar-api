import { body, param } from 'express-validator';

export const noteIdParamValidation = [
  param('id', 'Note id is required.').notEmpty(),
];

export const createNoteValidation = [
  body('title', 'Title is required.').notEmpty(),
  body('content', 'Content is required.').notEmpty(),
];

export const updateNoteValidation = [
  param('id', 'Note id is required.').notEmpty(),
  body('title', 'Title is required.').notEmpty(),
  body('content', 'Content is required.').notEmpty(),
];
