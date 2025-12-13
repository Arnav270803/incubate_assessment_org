import test from 'node:test';
import assert from 'node:assert';
import { registerUser } from '../../controllers/userController.js';

test('registerUser should fail when email or password is missing', async () => {
  const req = { body: {} };

  let jsonResponse;
  const res = {
    json: (data) => { jsonResponse = data; }
  };

  await registerUser(req, res);

  assert.strictEqual(jsonResponse.success, false);
  assert.strictEqual(jsonResponse.message, 'Missing Details');
});
