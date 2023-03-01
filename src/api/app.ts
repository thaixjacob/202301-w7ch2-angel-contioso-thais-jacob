import express from 'express';
import apiRouter from './api/api-router.js';
import { authMiddleware } from './api/auth/auth-middleware.js';
import authRouter from './api/auth/auth-router.js';
import carValidation from '../cars/car-validation.js';

const app = express();

app.get('/', (req, res) => {
  res.json('server on');
});
app.use(express.json());
app.use('/auth', authRouter);
app.use('/api/v1', authMiddleware, apiRouter);

app.use((err, req, res) => {
  if (err instanceof carValidation) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json(err);
});

export default app;
