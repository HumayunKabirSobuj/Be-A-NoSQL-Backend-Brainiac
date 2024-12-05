import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
// import { NewUser } from './user.interface';
import { User } from './user.model';
import { genarateStudentID } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};

  //if password does not given , use default password
  // if (!password) {
  //   user.password = config.default_password as string;
  // } else {
  //   user.password = password;
  // }

  userData.password = password || (config.default_password as string);
  //set student role
  userData.role = 'student';

  // find academic semester info

  const admissionSemester = (await AcademicSemester.findById(
    payload.admissionSemester,
  )) as TAcademicSemester;

  //set automatic genarate id
  userData.id =await genarateStudentID(admissionSemester);

  // create a user
  const newUser = await User.create(userData);

  //create a student

  if (Object.keys(newUser).length) {
    //set id, _id as user
    payload.id = newUser.id;
    payload.user = newUser._id; //refference _id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
