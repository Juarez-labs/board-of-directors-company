import request from 'supertest';
import { createApp } from '../src/app';

const app = createApp();

describe('Tasks CRUD', () => {
  it('GET /tasks returns empty array initially', async () => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /tasks creates a task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'test task' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('test task');
    expect(res.body.status).toBe('todo');
    expect(typeof res.body.id).toBe('string');
  });

  it('POST /tasks returns 400 when title missing', async () => {
    const res = await request(app).post('/tasks').send({});
    expect(res.status).toBe(400);
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

  it('DELETE /tasks/:id removes task', async () => {
    const create = await request(app).post('/tasks').send({ title: 'delete me' });
    const del = await request(app).delete(`/tasks/${create.body.id}`);
    expect(del.status).toBe(204);
    const get = await request(app).get(`/tasks/${create.body.id}`);
    expect(get.status).toBe(404);
  });
});
