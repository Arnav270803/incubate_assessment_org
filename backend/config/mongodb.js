import mongoose from "mongoose";

const connectDB = async () => {
    process.env.MONGODB_URI = 'mongodb://test-uri';

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI not defined');
  }

  mongoose.connection.on('connected', () => {
    console.log("Database Connected ");
  });

  await mongoose.connect(process.env.MONGODB_URI);
};

export default connectDB;
