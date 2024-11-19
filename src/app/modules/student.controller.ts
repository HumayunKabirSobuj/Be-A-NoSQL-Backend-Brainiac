import { Request, Response } from 'express';
import { studentServices } from './student.service';

const CreateStudent = async (req: Request, res: Response) => {
  try {
    const {student:studentData} = req.body;
    //will call service function to sent this data
    const result = await studentServices.createStudentIntoDB(studentData);
    // sent response
    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentController={
    CreateStudent
}