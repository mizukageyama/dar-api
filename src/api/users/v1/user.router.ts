import express from 'express';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  updateUserToAdmin,
} from './user.controller';
import { verifyAdminAccess } from '../../../middlewares/admin.verification.middleware';
import { verifyAccessToken } from '../../../middlewares/access.token.middleware';
import {
  createUserValidation,
  updateUserValidation,
  userIdParamValidation,
} from './user.validation';

const router = express.Router();
router.use(express.json());

router.get('/', verifyAccessToken, verifyAdminAccess, getUsers);
router.get('/:id', verifyAccessToken, userIdParamValidation, getUser);
router.post(
  '/',
  verifyAccessToken,
  verifyAdminAccess,
  createUserValidation,
  createUser
);
router.patch('/:id', verifyAccessToken, updateUserValidation, updateUser);
router.patch(
  '/:id/admin',
  verifyAccessToken,
  verifyAdminAccess,
  userIdParamValidation,
  updateUserToAdmin
);
router.delete(
  '/:id',
  verifyAccessToken,
  verifyAdminAccess,
  userIdParamValidation,
  deleteUser
);

export default router;

/**
 * NICE TO HAVE:
 *
 * router.patch('/upgrade-to-premium', updateUserToPremium);
 */
