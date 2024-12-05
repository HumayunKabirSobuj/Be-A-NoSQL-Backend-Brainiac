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
  let currentId = (0).toString(); // 0000 --> by default

  // 2030 01 0001
  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4);
  const currentSemesterCode = paylod.code;
  const currentYear = paylod.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentSemesterYear === currentYear
  ) {
    currentId = lastStudentId;
  }

  


  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${paylod.year}${paylod.code}${incrementId}`;

  return incrementId;
};
