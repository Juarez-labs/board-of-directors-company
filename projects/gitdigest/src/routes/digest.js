const express = require('express');
const Joi = require('joi');
const { DigestService } = require('../services/digestService');
const { rateLimiter } = require('../middleware/rateLimiter');

const router = express.Router();
const digestService = new DigestService();

const digestSchema = Joi.object({
  diff: Joi.string().max(500_000).required(),
  format: Joi.string().valid('markdown', 'plaintext', 'json').default('markdown'),
  style: Joi.string().valid('concise', 'detailed', 'conventional').default('concise'),
});

router.post('/digest', rateLimiter, async (req, res, next) => {
  try {
    const { error, value } = digestSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const result = await digestService.digest(value);
    return res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = { digestRouter: router };
