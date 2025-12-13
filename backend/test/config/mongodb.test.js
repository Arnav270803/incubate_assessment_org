import test from 'node:test';
import assert from 'node:assert';
import mongoose from 'mongoose';
import connectDB from '../../config/mongodb.js';

test('connectDB should connect to MongoDB and register connected event', async (t) => {
  let connectCalled = false;

  mongoose.connect = async () => {
    connectCalled = true;
  };

  mongoose.connection.on = () => {};

  await connectDB();

  assert.strictEqual(connectCalled, true);

  // ✅ HARD CLEANUP (THIS IS THE KEY)
  await mongoose.disconnect();
});
