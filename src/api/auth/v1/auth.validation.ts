import { body, param } from 'express-validator';

export const registerValidation = [
  body('firstName', 'First name is required.').notEmpty(),
  body('lastName', 'Last name is required.').notEmpty(),
];
