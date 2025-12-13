import test from 'node:test';
import assert from 'node:assert';
import userAuth from '../../middleware/auth.js';

test('userAuth should fail when token is missing', async () => {
  const req = {
    headers: {},
    body: {}
  };

  let jsonResponse;
  const res = {
    json: (data) => {
      jsonResponse = data;
    }
  };

  let nextCalled = false;
  const next = () => {
    nextCalled = true;
  };

  await userAuth(req, res, next);

  assert.strictEqual(jsonResponse.success, false);
  assert.strictEqual(jsonResponse.message, 'Not Authorized. Login Again');
  assert.strictEqual(nextCalled, false);
});
