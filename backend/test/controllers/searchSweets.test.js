import test from 'node:test';
import assert from 'node:assert';
import sweetModel from '../../models/sweetModel.js';
import { searchSweets } from '../../controllers/sweetController.js';

test('searchSweets should return sweets matching name or category', async () => {
  sweetModel.find = async () => ([
    { name: 'Ladoo', category: 'Indian' }
  ]);

  const req = {
    query: { q: 'Lad' }
  };

  let response;
  const res = {
    json: (data) => { response = data; }
  };

  await searchSweets(req, res);

  assert.strictEqual(response.success, true);
  assert.strictEqual(response.sweets.length, 1);
  assert.strictEqual(response.sweets[0].name, 'Ladoo');
});
