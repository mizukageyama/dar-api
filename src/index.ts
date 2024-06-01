import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swagger';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
// import taskRoutes from './routes/taskRoutes';
// import darRoutes from './routes/darRoutes';

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/tasks', taskRoutes);
// app.use('/api/dar', darRoutes);

const port = process.env.PORT || 3000;

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
