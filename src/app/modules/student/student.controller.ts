import { NextFunction, Request, Response } from 'express';
import { studentServices } from './student.service';
// import studentValidationSchema from './student.zod.validation';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentServices.getAllStudentFromDB();
    res.status(200).json({
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
    res.status(200).json({
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
    res.status(200).json({
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
