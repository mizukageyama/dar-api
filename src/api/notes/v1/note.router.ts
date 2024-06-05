import express from 'express';
import { verifyAccessToken } from '../../../middlewares/access.token.middleware';
import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} from './note.controller';
import {
  createNoteValidation,
  noteIdParamValidation,
  updateNoteValidation,
} from './note.validation';
const router = express.Router();
router.use(express.json());

router.get('/', verifyAccessToken, getNotes);
router.get('/:id', verifyAccessToken, noteIdParamValidation, getNote);
router.post('/', verifyAccessToken, createNoteValidation, createNote);
router.patch('/:id', verifyAccessToken, updateNoteValidation, updateNote);
router.delete('/:id', verifyAccessToken, noteIdParamValidation, deleteNote);

export default router;
