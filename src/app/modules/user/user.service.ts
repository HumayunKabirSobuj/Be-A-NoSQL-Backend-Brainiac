import HttpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
// import { NewUser } from './user.interface';
import { User } from './user.model';
import { genarateStudentID } from './user.utils';
import AppError from '../../errors/AppError';

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

  // startSession()
  const session = await mongoose.startSession();

  try {
    //startTransaction()
    session.startTransaction();
    //set automatic genarate id
    userData.id = await genarateStudentID(admissionSemester);

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });
    // console.log(newUser)

    if (!newUser.length) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'Failed to create user');
    }

    //create a student

    if (newUser.length) {
      //set id, _id as user
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //refference _id

      //create a student(Transaction-2)
      const newStudent = await Student.create([payload], { session });
      if (!newStudent.length) {
        throw new AppError(HttpStatus.BAD_REQUEST, 'Failed to create student');
      }
      await session.commitTransaction();
      await session.endSession();
      return newStudent;
    }
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const UserServices = {
  createStudentIntoDB,
};
