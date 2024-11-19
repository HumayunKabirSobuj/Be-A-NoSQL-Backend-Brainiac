import express, { Request, Response } from 'express';
import cors from 'cors';
const app = express();
const port = 3000;
app.use(cors());

//parser
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;

console.log(process.cwd());
