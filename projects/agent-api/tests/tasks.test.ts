import request from 'supertest';
import { createApp } from '../src/app';

const app = createApp();

describe('Tasks CRUD', () => {
  it('GET /tasks returns empty array initially', async () => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /tasks creates a task with default priority', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'test task' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('test task');
    expect(res.body.status).toBe('todo');
    expect(res.body.priority).toBe('medium');
    expect(typeof res.body.id).toBe('string');
  });

  it('POST /tasks creates a task with explicit priority', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'urgent task', priority: 'critical' });
    expect(res.status).toBe(201);
    expect(res.body.priority).toBe('critical');
  });

  it('POST /tasks returns 400 when title missing', async () => {
    const res = await request(app).post('/tasks').send({});
    expect(res.status).toBe(400);
  });

  it('POST /tasks returns 400 for invalid priority', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'bad priority', priority: 'urgent' });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/priority must be one of/);
  });

  it('GET /tasks/:id returns task', async () => {
    const create = await request(app).post('/tasks').send({ title: 'findme' });
    const res = await request(app).get(`/tasks/${create.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('findme');
  });

  it('PATCH /tasks/:id updates status', async () => {
    const create = await request(app).post('/tasks').send({ title: 'update me' });
    const res = await request(app)
      .patch(`/tasks/${create.body.id}`)
      .send({ status: 'done' });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('done');
  });

  it('PATCH /tasks/:id updates priority', async () => {
    const create = await request(app).post('/tasks').send({ title: 'reprioritize' });
    const res = await request(app)
      .patch(`/tasks/${create.body.id}`)
      .send({ priority: 'high' });
    expect(res.status).toBe(200);
    expect(res.body.priority).toBe('high');
  });

  it('PATCH /tasks/:id returns 400 for invalid priority', async () => {
    const create = await request(app).post('/tasks').send({ title: 'bad patch' });
    const res = await request(app)
      .patch(`/tasks/${create.body.id}`)
      .send({ priority: 'extreme' });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/priority must be one of/);
  });

  it('DELETE /tasks/:id removes task', async () => {
    const create = await request(app).post('/tasks').send({ title: 'delete me' });
    const del = await request(app).delete(`/tasks/${create.body.id}`);
    expect(del.status).toBe(204);
    const get = await request(app).get(`/tasks/${create.body.id}`);
    expect(get.status).toBe(404);
  });
});

describe('Tasks filtering', () => {
  // Use a fresh app instance so state is isolated from the CRUD suite above
  const filterApp = createApp();

  beforeAll(async () => {
    await request(filterApp).post('/tasks').send({ title: 'todo-low', priority: 'low' });
    await request(filterApp).post('/tasks').send({ title: 'todo-high', priority: 'high' });
    await request(filterApp).post('/tasks').send({ title: 'done-high', priority: 'high' });

    // advance second task to in_progress, third to done
    const all = (await request(filterApp).get('/tasks')).body;
    const second = all.find((t: { title: string }) => t.title === 'done-high');
    await request(filterApp).patch(`/tasks/${second.id}`).send({ status: 'done' });
  });

  it('GET /tasks?status=todo returns only todo tasks', async () => {
    const res = await request(filterApp).get('/tasks?status=todo');
    expect(res.status).toBe(200);
    expect(res.body.every((t: { status: string }) => t.status === 'todo')).toBe(true);
  });

  it('GET /tasks?priority=high returns only high-priority tasks', async () => {
    const res = await request(filterApp).get('/tasks?priority=high');
    expect(res.status).toBe(200);
    expect(res.body.every((t: { priority: string }) => t.priority === 'high')).toBe(true);
    // At least the two tasks created in beforeAll must appear
    const titles = res.body.map((t: { title: string }) => t.title);
    expect(titles).toContain('todo-high');
    expect(titles).toContain('done-high');
  });

  it('GET /tasks?status=done&priority=high returns intersection', async () => {
    const res = await request(filterApp).get('/tasks?status=done&priority=high');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe('done-high');
  });

  it('GET /tasks?status=invalid returns 400', async () => {
    const res = await request(filterApp).get('/tasks?status=invalid');
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/status must be one of/);
  });

  it('GET /tasks?priority=invalid returns 400', async () => {
    const res = await request(filterApp).get('/tasks?priority=invalid');
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/priority must be one of/);
  });
});
