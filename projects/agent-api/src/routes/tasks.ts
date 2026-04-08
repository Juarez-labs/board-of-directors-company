import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

type TaskStatus = 'todo' | 'in_progress' | 'done';
type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
}

const VALID_STATUSES: TaskStatus[] = ['todo', 'in_progress', 'done'];
const VALID_PRIORITIES: TaskPriority[] = ['low', 'medium', 'high', 'critical'];

// In-memory store — to be replaced with a real DB (tracked in backlog)
const tasks: Map<string, Task> = new Map();
let counter = 1;

router.get('/', (req: Request, res: Response) => {
  const { status, priority } = req.query as { status?: string; priority?: string };

  if (status !== undefined && !VALID_STATUSES.includes(status as TaskStatus)) {
    res.status(400).json({ error: `status must be one of: ${VALID_STATUSES.join(', ')}` });
    return;
  }
  if (priority !== undefined && !VALID_PRIORITIES.includes(priority as TaskPriority)) {
    res.status(400).json({ error: `priority must be one of: ${VALID_PRIORITIES.join(', ')}` });
    return;
  }

  let result = Array.from(tasks.values());
  if (status !== undefined) result = result.filter(t => t.status === status);
  if (priority !== undefined) result = result.filter(t => t.priority === priority);

  res.json(result);
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, priority } = req.body as { title?: string; priority?: string };
    if (!title || typeof title !== 'string' || title.trim() === '') {
      res.status(400).json({ error: 'title is required' });
      return;
    }
    if (priority !== undefined && !VALID_PRIORITIES.includes(priority as TaskPriority)) {
      res.status(400).json({ error: `priority must be one of: ${VALID_PRIORITIES.join(', ')}` });
      return;
    }
    const task: Task = {
      id: String(counter++),
      title: title.trim(),
      status: 'todo',
      priority: (priority as TaskPriority) ?? 'medium',
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
    const { title, status, priority } = req.body as {
      title?: string;
      status?: TaskStatus;
      priority?: TaskPriority;
    };
    if (status !== undefined && !VALID_STATUSES.includes(status)) {
      res.status(400).json({ error: `status must be one of: ${VALID_STATUSES.join(', ')}` });
      return;
    }
    if (priority !== undefined && !VALID_PRIORITIES.includes(priority)) {
      res.status(400).json({ error: `priority must be one of: ${VALID_PRIORITIES.join(', ')}` });
      return;
    }
    if (title !== undefined) task.title = title.trim();
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
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
