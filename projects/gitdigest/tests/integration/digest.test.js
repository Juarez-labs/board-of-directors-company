const request = require('supertest');
const app = require('../../src/app');

jest.mock('../../src/services/digestService', () => ({
  DigestService: jest.fn().mockImplementation(() => ({
    digest: jest.fn().mockResolvedValue({
      notes: '- feat: stubbed response',
      tokensUsed: 50,
    }),
  })),
}));

// Stub out Redis rate limiter for integration tests
jest.mock('../../src/middleware/rateLimiter', () => ({
  rateLimiter: (_req, _res, next) => next(),
}));

describe('POST /v1/digest', () => {
  test('returns 200 with notes and tokensUsed', async () => {
    const res = await request(app)
      .post('/v1/digest')
      .send({ diff: 'diff --git a/foo.js b/foo.js\n+const x = 1;' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('notes');
    expect(res.body).toHaveProperty('tokensUsed');
  });

  test('returns 400 for missing diff', async () => {
    const res = await request(app).post('/v1/digest').send({ format: 'markdown' });
    expect(res.status).toBe(400);
  });

  test('returns 400 for invalid format', async () => {
    const res = await request(app)
      .post('/v1/digest')
      .send({ diff: 'diff', format: 'html' });
    expect(res.status).toBe(400);
  });

  test('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
