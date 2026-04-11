require('dotenv').config();
const app = require('./app');
const logger = require('./logger');

if (!process.env.ANTHROPIC_API_KEY) {
  logger.error('ANTHROPIC_API_KEY is not set. Exiting.');
  process.exit(1);
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`gitdigest API listening on port ${PORT}`);
});
