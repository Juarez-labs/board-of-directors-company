const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { digestRouter } = require('./routes/digest');
const { errorHandler } = require('./middleware/errorHandler');
const logger = require('./logger');

const app = express();

// Trust one proxy hop (Railway/Fly.io/nginx) so req.ip resolves to real client IP
// See TRUST_PROXY_HOPS in .env.example
app.set('trust proxy', 1);

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', version: process.env.npm_package_version || '0.1.0' });
});

app.use('/v1', digestRouter);

app.use(errorHandler);

module.exports = app;
