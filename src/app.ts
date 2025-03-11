import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import httpStatus from 'http-status';
import AppError from './errors/AppError';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import routes from './routes';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/v1/api/', routes);

// Handling route not found
app.all('*', (req: Request, res: Response) => {
  throw new AppError(httpStatus.NOT_FOUND, 'Route not found');
});

app.use(globalErrorHandler);

export default app;
