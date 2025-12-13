import test from 'node:test';
import assert from 'node:assert';
import sweetModel from '../../models/sweetModel.js';
import { restockSweet } from '../../controllers/sweetController.js';

test('restockSweet should fail if sweet does not exist', async () => {
  sweetModel.findById = async () => null;

  const req = {
    params: { id: 'sweet123' },
    body: { quantity: 10 }
  };

  let response;
  const res = {
    json: (data) => { response = data; }
  };

  await restockSweet(req, res);

  assert.strictEqual(response.success, false);
  assert.strictEqual(response.message, 'Sweet not found');
});
