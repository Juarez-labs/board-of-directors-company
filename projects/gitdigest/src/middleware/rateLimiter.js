const rateLimit = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');
const { createClient } = require('redis');

let store;

if (process.env.REDIS_URL) {
  const redisClient = createClient({ url: process.env.REDIS_URL });
  redisClient.connect().catch(() => {
    // Fall back to in-memory if Redis unavailable
  });
  store = new RedisStore({ sendCommand: (...args) => redisClient.sendCommand(args) });
}

const rateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  store,
  message: { error: 'Rate limit exceeded. Max 100 requests per day per IP.' },
  keyGenerator: (req) => req.ip,
});

module.exports = { rateLimiter };
