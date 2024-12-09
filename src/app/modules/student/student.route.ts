import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';
import { StudentControllers } from './student.controller';

const router = express.Router();

//will call controller function

router.get('/:studentId', StudentControllers.getSingleStudent);
router.patch(
  '/:studentId',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:studentId', StudentControllers.deleteStudent);
router.get('/', StudentControllers.getAllStudents);
export const StudentRoutes = router;
