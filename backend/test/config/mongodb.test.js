import test from 'node:test';
import assert from 'node:assert';
import mongoose from 'mongoose';
import connectDB from '../../config/mongodb.js';

// Mock mongoose methods
let connectCalled = false;
let eventRegistered = false;

mongoose.connect = async () => {
  connectCalled = true;
};

mongoose.connection.on = (event, cb) => {
  if (event === 'connected') {
    eventRegistered = true;
  }
};

test('connectDB should connect to MongoDB and register connected event', async () => {
  await connectDB();

  assert.strictEqual(connectCalled, true);
  assert.strictEqual(eventRegistered, true);
});
