import test from 'node:test';
import assert from 'node:assert';
import sweetModel from '../../models/sweetModel.js';
import { getAllSweets } from '../../controllers/sweetController.js';

test('getAllSweets should return list of sweets', async () => {
  sweetModel.find = async () => ([
    { name: 'Ladoo', price: 10 },
    { name: 'Barfi', price: 20 }
  ]);

  const req = {};
  let response;
  const res = {
    json: (data) => { response = data; }
  };

  await getAllSweets(req, res);

  assert.strictEqual(response.success, true);
  assert.strictEqual(response.sweets.length, 2);
  assert.strictEqual(response.sweets[0].name, 'Ladoo');
});
