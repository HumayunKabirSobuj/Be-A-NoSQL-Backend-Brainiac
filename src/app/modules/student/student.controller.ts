import { RequestHandler } from 'express';
import { studentServices } from './student.service';
import sentResponse from '../../utils/sentResponse';
import HttpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// import studentValidationSchema from './student.zod.validation';



const getAllStudents = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudentFromDB();
  sentResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Students are retrived succesfully',
    data: result,
  });
});

const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  // const studentId = req.params.studentId;
  const { studentId } = req.params;
  const result = await studentServices.getSingleStudentFromDB(studentId);

  sentResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Student is retrived succesfully',
    data: result,
  });
});

const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  // const studentId = req.params.studentId;
  const { studentId } = req.params;
  const result = await studentServices.deleteStudentFromDB(studentId);

  sentResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Student is deleted succesfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
