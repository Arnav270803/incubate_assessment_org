import test from 'node:test';
import assert from 'node:assert';
import request from 'supertest';

import app from '../server.js';

test('GET / should return API Working', async () => {
  const res = await request(app).get('/');

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.text, 'API Working');
});
