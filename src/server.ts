import express, { NextFunction, Request, Response } from 'express';
import router from './routes';

const app = express();

app.use(express.json());
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error.',
    });
  },
);

app.get('/test', (request: Request, response: Response) => {
  return response.json({ message: 'Hello API Secret!' });
});

app.listen(3333, () => console.log('Server is running on port 3333.'));
