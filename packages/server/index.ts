import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
// this read all the environment variable from .env file and add to process.env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('');
});
app.get('/api/hello', (req: Request, res: Response) => {
  res.json({
    message: 'Hello from the server!',
  });
});

app.listen(port, () => {
  console.log(`Server  is is running on port http://localhost:${port}`);
});
