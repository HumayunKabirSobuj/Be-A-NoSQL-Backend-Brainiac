import express, { Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
const app = express();
// const port = 3000;
app.use(cors());

//parser
app.use(express.json());

//application Route
app.use('/api/v1/students', StudentRoutes);

const getController = (req: Request, res: Response) => {
  res.send('Hello World!');
};
app.get('/', getController);

export default app;

