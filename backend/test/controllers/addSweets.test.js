import test from 'node:test';
import assert from 'node:assert';
import { addSweet } from '../../controllers/sweetController.js';

test('addSweet should fail when required fields are missing', async () => {
  const req = {
    body: {}
  };

  let response;
  const res = {
    json: (data) => {
      response = data;
    }
  };

  await addSweet(req, res);

  assert.strictEqual(response.success, false);
  assert.strictEqual(response.message, 'Missing sweet details');
});
