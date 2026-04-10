const request = require('supertest');
const express = require('express');
const rateLimit = require('express-rate-limit');

/**
 * Integration tests for rate limit behaviour.
 * Uses a minimal Express app with a low max to trigger 429 deterministically,
 * avoiding any dependency on Redis or the full gitdigest app.
 */
function buildTestApp(max) {
  const app = express();
  app.use(express.json());
  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      max,
      standardHeaders: true,
      legacyHeaders: false,
      message: { error: 'Rate limit exceeded. Max 100 requests per day per IP.' },
    })
  );
  app.post('/v1/digest', (_req, res) => res.json({ notes: 'ok', tokensUsed: 10 }));
  return app;
}

describe('Rate limit integration', () => {
  test('returns 429 after exceeding the request limit', async () => {
    const app = buildTestApp(1);

    const first = await request(app)
      .post('/v1/digest')
      .send({ diff: 'diff content' });
    expect(first.status).toBe(200);

    const second = await request(app)
      .post('/v1/digest')
      .send({ diff: 'diff content' });
    expect(second.status).toBe(429);
    expect(second.body).toHaveProperty('error');
  });

  test('rate limit response includes Retry-After / RateLimit headers', async () => {
    const app = buildTestApp(1);

    await request(app).post('/v1/digest').send({ diff: 'diff' });
    const res = await request(app).post('/v1/digest').send({ diff: 'diff' });

    expect(res.status).toBe(429);
    // express-rate-limit v7 emits standardHeaders (RateLimit-*)
    expect(res.headers).toHaveProperty('ratelimit-limit');
  });
});
