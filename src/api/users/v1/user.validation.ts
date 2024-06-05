import { body, param } from 'express-validator';

export const userIdParamValidation = [
  param('id', 'User id is required.').notEmpty(),
];

export const createUserValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Invalid email address.'),
  body('firstName', 'First name is required.').notEmpty(),
  body('lastName', 'Last name is required.').notEmpty(),
];

export const updateUserValidation = [
  param('id', 'New first name is required').notEmpty(),
  body('firstName', 'First name is required.').notEmpty(),
  body('lastName', 'Last name is required.').notEmpty(),
];
