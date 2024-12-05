// auto genarate id

import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  // 203001   0001
  return lastStudent?.id ? lastStudent.id : undefined;
};

// need year, semester code and 4 digit number
export const genarateStudentID = async (paylod: TAcademicSemester) => {
  const currentId = (0).toString(); // 0000 --> by default
  if (await findLastStudentId()) {
    const lastStudent = await findLastStudentId();
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${paylod.year}${paylod.code}${incrementId}`;

  return incrementId;
};
