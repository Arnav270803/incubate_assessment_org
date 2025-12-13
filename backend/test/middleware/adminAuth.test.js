import test from 'node:test';
import assert from 'node:assert';
import adminAuth from '../../middleware/adminAuth.js';

test('adminAuth should block non-admin users', async () => {
  const req = {
    user: { role: 'USER' }
  };

  let response;
  const res = {
    json: (data) => { response = data; }
  };

  await adminAuth(req, res, () => {});

  assert.strictEqual(response.success, false);
  assert.strictEqual(response.message, 'Admin access required');
});
