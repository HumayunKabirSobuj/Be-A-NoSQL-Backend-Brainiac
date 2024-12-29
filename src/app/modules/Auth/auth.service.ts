import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
const loginUser = async (payload: TLoginUser) => {
  //checking if the user is exists
  const isUserExists = await User.findOne({ id: payload?.id });
  //   console.log(isUserExists);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  //checking if the user is already deleted

  const isDeleted = isUserExists?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }
  //checking if the user is blocked

  const userStatus = isUserExists?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
  }

  //checking if the password is correct
  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    isUserExists?.password,
  );
  console.log(isPasswordMatch);
  // Access granted send AccessToken , ReffreshToken
  return {};
};

export const AuthServices = {
  loginUser,
};
