/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalerrorhandler';
const app = express();
// const port = 3000;
app.use(cors());

//parser
app.use(express.json());

//application Route
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);

const getController = (req: Request, res: Response) => {
  res.send('Hello World!');
};
app.get('/', getController);

app.use(globalErrorHandler);

export default app;
