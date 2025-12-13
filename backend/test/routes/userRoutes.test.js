import test from 'node:test';
import assert from 'node:assert';
import express from 'express';
import request from 'supertest';
import userRouter from '../../routes/userRoutes.js';

const app = express();
app.use(express.json());
app.use('/api/user', userRouter);

test('POST /api/user/login should exist', async () => {
  const res = await request(app)
    .post('/api/user/login')
    .send({});

  // We only care that route exists, not business logic
  assert.notStrictEqual(res.statusCode, 404);
});
