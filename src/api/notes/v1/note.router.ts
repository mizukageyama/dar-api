import express from 'express';
import { verifyAccessToken } from '../../../middlewares/access.token.middleware';
import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} from './note.controller';
const router = express.Router();
router.use(express.json());

router.get('/', verifyAccessToken, getNotes);
router.get('/:id', verifyAccessToken, getNote);
router.post('/', verifyAccessToken, createNote);
router.patch('/:id', verifyAccessToken, updateNote);
router.delete('/:id', verifyAccessToken, deleteNote);

export default router;
