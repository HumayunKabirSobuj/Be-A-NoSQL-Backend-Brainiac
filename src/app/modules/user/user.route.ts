import express from 'express';
import { userControllers } from './user.controller';

import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';

const Router = express.Router();

Router.post(
  '/create-student',
  validateRequest(studentValidations.studentValidationSchema),
  userControllers.CreateStudent,
);



export const UserRoutes = Router;
