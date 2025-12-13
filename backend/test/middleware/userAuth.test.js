import test from 'node:test';
import assert from 'node:assert';
import jwt from 'jsonwebtoken';
import userAuth from '../../middleware/auth.js';

test('userAuth should allow request with valid token', async () => {
  jwt.verify = () => ({ id: 'user123' });

  const req = {
    headers: { token: 'valid-token' },
    body: {}
  };

  let nextCalled = false;
  const next = () => {
    nextCalled = true;
  };

  const res = {
    json: () => {}
  };

  await userAuth(req, res, next);

  assert.strictEqual(req.body.userId, 'user123');
  assert.strictEqual(nextCalled, true);
});

test('userAuth should fail on invalid token', async () => {
  jwt.verify = () => {
    throw new Error('Invalid token');
  };

  const req = {
    headers: { token: 'bad-token' },
    body: {}
  };

  let jsonResponse;
  const res = {
    json: (data) => {
      jsonResponse = data;
    }
  };

  const next = () => {};

  await userAuth(req, res, next);

  assert.strictEqual(jsonResponse.success, false);
  assert.strictEqual(jsonResponse.message, 'Invalid token');
});
