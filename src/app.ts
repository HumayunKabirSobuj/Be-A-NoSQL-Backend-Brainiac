/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app = express();
// const port = 3000;
app.use(cors());

//parser
app.use(express.json());

//application routes
app.use('/api/v1', router);


const test = (req: Request, res: Response) => {
  res.send('Hello World!');
};
app.get('/', test);

app.use(globalErrorHandler);

//not found
app.use(notFound);

export default app;
