import { NextFunction, Request, Response } from 'express';
import { studentServices } from './student.service';
import sentResponse from '../../utils/sentResponse';
import HttpStatus from 'http-status';

// import studentValidationSchema from './student.zod.validation';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentServices.getAllStudentFromDB();
    sentResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Students are retrived succesfully',
      data: result,
    });
    
  } catch (err) {
    // res.status(500).json({
    //   success: true,
    //   message: err.message || 'Something went wrong',
    //   error: err,
    // });
    next(err);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const studentId = req.params.studentId;
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentFromDB(studentId);
    
    sentResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Student is retrived succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const studentId = req.params.studentId;
    const { studentId } = req.params;
    const result = await studentServices.deleteStudentFromDB(studentId);
 
    sentResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Student is deleted succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
