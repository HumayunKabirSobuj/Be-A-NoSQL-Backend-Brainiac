import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';

const CreateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const studentData=req.body.student;
    const { password, student: studentData } = req.body;

    //data validation using zod
    // const zodParseData = studentValidationSchema.parse(studentData);

    //will call service function to sent this data
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );
    // sent response
    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userControllers = {
  CreateStudent,
};
