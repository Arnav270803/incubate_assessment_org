import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';

const app = express();

// global middleware
app.use(express.json());
app.use(cors());

// health check
app.get('/', (req, res) => {
  res.send('API Working');
});

// routes
app.use('/api/auth', authRouter);

// (future)
// app.use('/api/sweets', sweetRouter);

export default app;
