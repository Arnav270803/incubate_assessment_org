import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import sweetRouter from './routes/sweetRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// health check
app.get('/', (req, res) => {
  res.send('API Working');
});

// routes
app.use('/api/auth', authRouter);
app.use('/api/sweets', sweetRouter);

// start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Backend running at http://localhost:${PORT}`);
  });
});
