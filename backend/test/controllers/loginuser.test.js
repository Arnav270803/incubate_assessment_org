import test from 'node:test';
import assert from 'node:assert';
import { loginUser } from '../../controllers/userController.js';
import userModel from '../../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// mocks
userModel.findOne = async () => null;

test('loginUser should fail if user does not exist', async () => {
  const req = {
    body: { email: 'test@test.com', password: '123456' }
  };

  let jsonResponse;
  const res = {
    json: (data) => { jsonResponse = data; }
  };

  await loginUser(req, res);

  assert.strictEqual(jsonResponse.success, false);
  assert.strictEqual(jsonResponse.message, 'User does not exist');
});
