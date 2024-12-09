import { RequestHandler } from 'express';
import { studentServices } from './student.service';
import sendResponse from '../../utils/sentResponse';
import HttpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// import studentValidationSchema from './student.zod.validation';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudentFromDB();
  sendResponse(res, {
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

  sendResponse(res, {
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

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Student is deleted succesfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await studentServices.updateStudentIntoDB(studentId, student);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Student is updated succesfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
