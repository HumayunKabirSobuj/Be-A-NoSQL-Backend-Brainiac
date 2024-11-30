import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
// import { NewUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
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

  //set manualay genarate id
  userData.id = '203010001';

  // create a user
  const newUser = await User.create(userData);

  //create a student

  if (Object.keys(newUser).length) {
    //set id, _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id; //refference _id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
