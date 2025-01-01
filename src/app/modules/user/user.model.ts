import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { TUser, UserModel } from './user.interface';
const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangeAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// authentication statics function

// userSchema.statics.isUserExistsByCustomId = async function (id: string) {
//  return await User.findOne({ id });
// };

userSchema.static(
  'isUserExistsByCustomId',
  async function isUserExistsByCustomId(id: string) {
    return await User.findOne({ id }).select('+password');
  },
);

userSchema.statics.isPasswordMatch = async function (
  plainTextPassword,
  hashPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

userSchema.static(
  'isJWTIssuedBeforePasswordChange',
  function isJWTIssuedBeforePasswordChange(
    passwordChangeTimeStamp: Date,
    JWTIssuedTimeStamp: number,
  ) {
    const passwordChangeTime =
      new Date(passwordChangeTimeStamp).getTime() / 1000;
    return passwordChangeTime > JWTIssuedTimeStamp;
  },
);

export const User = model<TUser, UserModel>('User', userSchema);
