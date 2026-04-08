import express, { Application } from 'express';
import healthRouter from './routes/health';
import tasksRouter from './routes/tasks';
import { errorHandler } from './middleware/errorHandler';

export function createApp(): Application {
  const app = express();

  app.use(express.json());

  app.use('/health', healthRouter);
  app.use('/tasks', tasksRouter);

  app.use(errorHandler);

  return app;
}
