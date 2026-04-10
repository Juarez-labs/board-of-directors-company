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

  test('returns 400 when diff exceeds 500KB', async () => {
    const largeDiff = 'a'.repeat(500_001);
    const res = await request(app)
      .post('/v1/digest')
      .send({ diff: largeDiff });
    expect(res.status).toBe(400);
  });

  test('returns 500 when digest service throws', async () => {
    const { DigestService } = require('../../src/services/digestService');
    const mockInstance = DigestService.mock.results[0].value;
    mockInstance.digest.mockRejectedValueOnce(new Error('AI service unavailable'));

    const res = await request(app)
      .post('/v1/digest')
      .send({ diff: 'some diff content' });

    expect(res.status).toBe(500);
  });

  test('handles concurrent requests', async () => {
    const requests = Array(5).fill(null).map(() =>
      request(app)
        .post('/v1/digest')
        .send({ diff: 'diff --git a/concurrent.js b/concurrent.js\n+const c = 1;' })
    );
    const responses = await Promise.all(requests);
    responses.forEach((res) => expect(res.status).toBe(200));
  });
});

describe('GET /health', () => {
  test('returns ok with default version', async () => {
    delete process.env.npm_package_version;
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.version).toBe('0.1.0');
  });

  test('returns ok with env-provided version', async () => {
    process.env.npm_package_version = '1.2.3';
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.version).toBe('1.2.3');
    delete process.env.npm_package_version;
  });
});
