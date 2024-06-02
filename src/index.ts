import express, { Express, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swagger';
import mongoose from 'mongoose';
import authRouter from './api/auth/v1/auth.router';
import userRouter from './api/users/v1/user.router';
import taskRouter from './api/tasks/v1/task.router';
import darRouter from './api/dar/v1/dar.router';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/dar', darRouter);

app.get('/', (res: Response) => {
  res.send('Express + TypeScript Server');
});

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING || '')
  .then(() => console.log('[server]: MongoDB connected'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
