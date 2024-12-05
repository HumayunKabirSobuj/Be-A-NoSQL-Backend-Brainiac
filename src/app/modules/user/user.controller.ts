import { UserServices } from './user.service';
import sendResponse from '../../utils/sentResponse';
import HttpStatus from 'http-status';

import catchAsync from '../../utils/catchAsync';


const CreateStudent = catchAsync(async (req, res) => {
  // const studentData=req.body.student;
  const { password, student: studentData } = req.body;

  //data validation using zod
  // const zodParseData = studentValidationSchema.parse(studentData);

  //will call service function to sent this data
  const result = await UserServices.createStudentIntoDB(password, studentData);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Student is created succesfully',
    data: result,
  });
});

export const userControllers = {
  CreateStudent,
};
