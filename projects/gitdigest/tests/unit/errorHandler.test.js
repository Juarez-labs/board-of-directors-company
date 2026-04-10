jest.mock('../../src/logger', () => ({
  error: jest.fn(),
}));

const { errorHandler } = require('../../src/middleware/errorHandler');

describe('errorHandler middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  test('returns error message for 4xx errors', () => {
    const err = { message: 'Bad request data', status: 400, stack: 'Error\n  at ...' };
    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Bad request data' });
  });

  test('returns generic message for explicit 5xx errors', () => {
    const err = { message: 'DB connection failed', status: 503, stack: 'Error\n  at ...' };
    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(503);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });

  test('defaults to 500 when no status is provided', () => {
    const err = { message: 'Something went wrong', stack: 'Error\n  at ...' };
    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });

  test('returns error message for 404', () => {
    const err = { message: 'Resource not found', status: 404, stack: 'Error\n  at ...' };
    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Resource not found' });
  });
});
