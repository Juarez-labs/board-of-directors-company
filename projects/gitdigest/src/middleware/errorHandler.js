const logger = require('../logger');

function errorHandler(err, _req, res, _next) {
  logger.error({ message: err.message, stack: err.stack });

  const status = err.status || 500;
  const message = status < 500 ? err.message : 'Internal server error';

  res.status(status).json({ error: message });
}

module.exports = { errorHandler };
