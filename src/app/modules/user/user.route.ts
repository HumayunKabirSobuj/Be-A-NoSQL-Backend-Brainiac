import express from 'express';
import { userControllers } from './user.controller';

const Router = express.Router();

Router.post('/create-student',userControllers.CreateStudent)

export const UserRoutes = Router;
