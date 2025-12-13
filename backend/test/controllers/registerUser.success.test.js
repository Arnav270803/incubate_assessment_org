import test from 'node:test';
import assert from 'node:assert';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../../models/userModel.js';
import { registerUser } from '../../controllers/userController.js';

test('registerUser should succeed with valid input', async () => {
  // mock bcrypt
  bcrypt.genSalt = async () => 'salt';
  bcrypt.hash = async () => 'hashed-password';

  // mock jwt
  jwt.sign = () => 'fake-jwt-token';

  // mock mongoose model behavior
  userModel.prototype.save = async function () {
    this._id = 'new-user-id';
    return this;
  };

  const req = {
    body: {
      email: 'new@test.com',
      password: '123456'
    }
  };

  let response;
  const res = {
    json: (data) => {
      response = data;
    }
  };

  await registerUser(req, res);

  assert.strictEqual(response.success, true);
  assert.strictEqual(response.token, 'fake-jwt-token');
  assert.strictEqual(response.user.name, 'new@test.com');
});
