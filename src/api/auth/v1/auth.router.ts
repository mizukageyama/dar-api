import express from 'express';
import { generateTestToken, login, register } from './auth.controller';
import verifyTokenId from './auth.middleware';

const router = express.Router();
router.use(express.json());

router.post('/test-token', generateTestToken);
router.post('/login', verifyTokenId, login);
router.post('/register', verifyTokenId, register);

export default router;
