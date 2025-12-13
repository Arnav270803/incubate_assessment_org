import test from 'node:test';
import assert from 'node:assert';
import { loginUser } from '../../controllers/userController.js';

test('loginUser should fail if user does not exist', async () => {
  const fakeUserModel = {
    findOne: async () => null
  };

  const req = {
    body: { email: 'test@test.com', password: '123456' }
  };

  let jsonResponse;
  const res = {
    json: (data) => { jsonResponse = data; }
  };

  const handler = loginUser(fakeUserModel);
  await handler(req, res);

  assert.strictEqual(jsonResponse.success, false);
  assert.strictEqual(jsonResponse.message, 'User does not exist');
});
