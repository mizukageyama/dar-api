import express from 'express';
import { getDar } from './dar.controller';
import { verifyAccessToken } from '../../../middlewares/access.token.middleware';
const router = express.Router();
router.use(express.json());

router.get('/', verifyAccessToken, getDar);

export default router;
