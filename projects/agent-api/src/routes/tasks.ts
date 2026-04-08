import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  createdAt: string;
}

// In-memory store — to be replaced with a real DB (tracked in backlog)
const tasks: Map<string, Task> = new Map();
let counter = 1;

router.get('/', (_req: Request, res: Response) => {
  res.json(Array.from(tasks.values()));
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title } = req.body as { title?: string };
    if (!title || typeof title !== 'string' || title.trim() === '') {
      res.status(400).json({ error: 'title is required' });
      return;
    }
    const task: Task = {
      id: String(counter++),
      title: title.trim(),
      status: 'todo',
      createdAt: new Date().toISOString(),
    };
    tasks.set(task.id, task);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', (req: Request, res: Response) => {
  const task = tasks.get(req.params.id);
  if (!task) {
    res.status(404).json({ error: 'task not found' });
    return;
  }
  res.json(task);
});

router.patch('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = tasks.get(req.params.id);
    if (!task) {
      res.status(404).json({ error: 'task not found' });
      return;
    }
    const { title, status } = req.body as { title?: string; status?: Task['status'] };
    const validStatuses: Task['status'][] = ['todo', 'in_progress', 'done'];
    if (status !== undefined && !validStatuses.includes(status)) {
      res.status(400).json({ error: `status must be one of: ${validStatuses.join(', ')}` });
      return;
    }
    if (title !== undefined) task.title = title.trim();
    if (status !== undefined) task.status = status;
    res.json(task);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', (req: Request, res: Response) => {
  if (!tasks.has(req.params.id)) {
    res.status(404).json({ error: 'task not found' });
    return;
  }
  tasks.delete(req.params.id);
  res.status(204).send();
});

export default router;
