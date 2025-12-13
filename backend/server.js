import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';
import sweetRouter from './routes/sweetRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API Working');
});

app.use('/api/auth', authRouter);
app.use('/api/sweets', sweetRouter);

export default app;
