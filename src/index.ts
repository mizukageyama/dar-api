import express, { Express, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swagger';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import taskRoutes from './routes/task.routes';
import darRoutes from './routes/dar.routes';
import mongoose from 'mongoose';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/dar', darRoutes);

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
