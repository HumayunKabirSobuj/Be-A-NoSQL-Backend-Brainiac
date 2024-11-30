import { Student } from './student.model';


const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await StudentModel.findOne({ id: id });
  // const result = await Student.findOne({ id }); //ES66
  const result = Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  // const result = await StudentModel.findOne({ id: id });
  const result = await Student.updateOne({ id }, { isDeleted: true }); //ES66
  return result;
};

export const studentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
