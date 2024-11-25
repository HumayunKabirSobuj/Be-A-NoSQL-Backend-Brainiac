import { Request, Response } from 'express';
import { studentServices } from './student.service';
// import studentValidationSchema from './student.zod.validation';
const CreateStudent = async (req: Request, res: Response) => {
  try {
    // const studentData=req.body.student;
    const { student: studentData } = req.body;

    //data validation using zod
    // const zodParseData = studentValidationSchema.parse(studentData);

    //will call service function to sent this data
    const result = await studentServices.createStudentIntoDB(studentData);
    // sent response
    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: 'Something went wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are retrived succesfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    // const studentId = req.params.studentId;
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrived succesfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentController = {
  CreateStudent,
  getAllStudents,
  getSingleStudent,
};
