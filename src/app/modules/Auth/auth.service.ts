import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';
// const loginUser = async (payload: TLoginUser) => {
//   //checking if the user is exists
//   const isUserExists = await User.findOne({ id: payload?.id });
//   //   console.log(isUserExists);
//   if (!isUserExists) {
//     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
//   }
//   //checking if the user is already deleted

//   const isDeleted = isUserExists?.isDeleted;
//   if (isDeleted) {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
//   }
//   //checking if the user is blocked

//   const userStatus = isUserExists?.status;
//   if (userStatus === 'blocked') {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
//   }

//   //checking if the password is correct
//   const isPasswordMatch = await bcrypt.compare(
//     payload?.password,
//     isUserExists?.password,
//   );
//   console.log(isPasswordMatch);
//   // Access granted send AccessToken , ReffreshToken
//   return {};
// };

//  For Use Statics Method
const loginUser = async (payload: TLoginUser) => {
  //checking if the user is exists
  const user = await User.isUserExistsByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatch(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched !');
  }
  // console.log(user)

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };

  // create token and sent to the client
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  // Access granted send AccessToken , ReffreshToken
  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};


const changePassword =async()=>{

}

export const AuthServices = {
  loginUser,
  changePassword
};
