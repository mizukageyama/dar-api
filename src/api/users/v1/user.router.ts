import express, { Request, Response } from 'express';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from './user.controller';
import { verifyAdminAccess } from '../../../middlewares/admin.verification.middleware';
import { verifyAccessToken } from '../../../middlewares/access.token.middleware';
const router = express.Router();
router.use(express.json());

router.get('/', verifyAccessToken, verifyAdminAccess, getUsers);
router.get('/:id', verifyAccessToken, getUser);
router.post('/', verifyAccessToken, verifyAdminAccess, createUser);
router.patch('/:id', verifyAccessToken, updateUser);
router.delete('/:id', verifyAccessToken, verifyAdminAccess, deleteUser);

export default router;

/**
 * NICE TO HAVE:
 *
 * router.patch('/:id/admin', updateUserToAdmin);
 * router.patch('/upgrade-to-premium', updateUserToPremium);
 */
