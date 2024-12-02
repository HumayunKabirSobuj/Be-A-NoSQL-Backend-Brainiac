import express, { NextFunction, Request, Response } from 'express';
import { userControllers } from './user.controller';
import { AnyZodObject } from 'zod';
import { studentValidations } from '../student/student.validation';

const Router = express.Router();

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // validation check
      // if everything allright next() -->
      await schema.parseAsync({ body: req.body });
      return next();
    } catch (err) {
      next(err);
    }
  };
};

Router.post(
  '/create-student',
  validateRequest(studentValidations.studentValidationSchema),
  userControllers.CreateStudent,
);

export const UserRoutes = Router;
