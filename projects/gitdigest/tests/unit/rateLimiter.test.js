// All mocks declared before jest hoisting runs their factories
jest.mock('redis', () => ({
  createClient: jest.fn().mockReturnValue({
    connect: jest.fn().mockResolvedValue(undefined),
    sendCommand: jest.fn(),
  }),
}));

jest.mock('rate-limit-redis', () => ({
  RedisStore: jest.fn().mockImplementation(() => ({ type: 'redis-store' })),
}));

jest.mock('express-rate-limit', () =>
  jest.fn().mockReturnValue((_req, _res, next) => next())
);

describe('rateLimiter middleware', () => {
  const originalRedisUrl = process.env.REDIS_URL;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  afterAll(() => {
    if (originalRedisUrl !== undefined) {
      process.env.REDIS_URL = originalRedisUrl;
    } else {
      delete process.env.REDIS_URL;
    }
  });

  test('exports a middleware function', () => {
    delete process.env.REDIS_URL;
    const { rateLimiter } = require('../../src/middleware/rateLimiter');
    expect(typeof rateLimiter).toBe('function');
  });

  test('does not create Redis client when REDIS_URL is not set', () => {
    delete process.env.REDIS_URL;
    require('../../src/middleware/rateLimiter');
    const { createClient } = require('redis');
    expect(createClient).not.toHaveBeenCalled();
  });

  test('creates Redis client when REDIS_URL is set', () => {
    process.env.REDIS_URL = 'redis://localhost:6379';
    require('../../src/middleware/rateLimiter');
    const { createClient } = require('redis');
    expect(createClient).toHaveBeenCalledWith({ url: 'redis://localhost:6379' });
  });

  test('creates RedisStore when REDIS_URL is set', () => {
    process.env.REDIS_URL = 'redis://localhost:6379';
    require('../../src/middleware/rateLimiter');
    const { RedisStore } = require('rate-limit-redis');
    expect(RedisStore).toHaveBeenCalled();
  });

  test('configures rate limiter with 100 req/day window', () => {
    delete process.env.REDIS_URL;
    require('../../src/middleware/rateLimiter');
    const rateLimit = require('express-rate-limit');
    expect(rateLimit).toHaveBeenCalledWith(
      expect.objectContaining({
        windowMs: 24 * 60 * 60 * 1000,
        max: 100,
      })
    );
  });

  test('sendCommand wrapper forwards args to redis client', () => {
    process.env.REDIS_URL = 'redis://localhost:6379';
    require('../../src/middleware/rateLimiter');
    const { RedisStore } = require('rate-limit-redis');
    const { createClient } = require('redis');
    const client = createClient.mock.results[0].value;
    // Extract the sendCommand wrapper that was passed to RedisStore
    const storeConfig = RedisStore.mock.calls[0][0];
    storeConfig.sendCommand('GET', 'key');
    expect(client.sendCommand).toHaveBeenCalledWith(['GET', 'key']);
  });

  test('keyGenerator returns req.ip', () => {
    delete process.env.REDIS_URL;
    require('../../src/middleware/rateLimiter');
    const rateLimit = require('express-rate-limit');
    const config = rateLimit.mock.calls[0][0];
    expect(config.keyGenerator({ ip: '10.0.0.1' })).toBe('10.0.0.1');
  });

  test('falls back gracefully when Redis connect rejects', async () => {
    process.env.REDIS_URL = 'redis://localhost:6379';
    const redis = require('redis');
    redis.createClient.mockReturnValue({
      connect: jest.fn().mockRejectedValue(new Error('Connection refused')),
      sendCommand: jest.fn(),
    });
    // Should not throw synchronously
    expect(() => require('../../src/middleware/rateLimiter')).not.toThrow();
    // Allow the async rejection to settle without unhandled promise warning
    await Promise.resolve();
  });
});
