import { Schema, model } from 'mongoose';
import validator from 'validator';

import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface';

//create Schema

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is Required'],
    trim: true,
    maxlength: [20, 'First name cannot be more than 20 characters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        // if (value !== firstNameStr) {
        //   return false;
        // }
        // return true;
        return value === firstNameStr;
        // console.log(firstNameStr);
      },
      message: '{VALUE} is not in capitalize formate',
    },
  },
  middleName: {
    trim: true,
    type: String,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is Required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const gurdianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Father Name is Required'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Father Occupation is Required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father ContactNo is Required'],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, 'Mother Name is Required'],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Mother Occupation is Required'],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Mother ContactNo is Required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    trim: true,
    required: [true, 'Local Guardian Name is Required'],
  },
  occupation: {
    type: String,
    trim: true,
    required: [true, 'Local Guardian occupation is Required'],
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, 'Local Guardian ContactNo is Required'],
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'Local Guardian address is Required'],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: [true, 'Id is required'], unique: true },
    //refference
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User', //ref:'User' এখানে User হচ্ছে model name
    },

    name: {
      type: userNameSchema,
      required: [true, 'Student Name is Required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message:
          'The gender field can only be one of the following "male" or "female" or "other". {VALUE} is not supported',
      },
      required: [true, 'Student gender is Required'],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      trim: true,
      required: [true, 'Student email is Required'],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email type',
      },
    },
    contactNo: {
      type: String,
      trim: true,
      required: [true, 'Student contactNo is Required'],
    },
    emergencyContactNo: {
      type: String,
      trim: true,
      required: [true, 'Student emergency contactNo is Required'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      trim: true,
      required: [true, 'Student present address is Required'],
    },
    permanentAddress: {
      type: String,
      trim: true,
      required: [true, 'Student parmanent address is Required'],
    },
    guardian: {
      type: gurdianSchema,
      required: [true, 'Guardian field is Required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian field is Required'],
    },
    profileImg: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//virtual

studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

//Query Middleware

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  // console.log(this.pipeline())
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
//document middleware

//pre save middlware / hook : will work on create() or save()

//creating a custom static method

studentSchema.statics.isUserExists = async function (id: string) {
  // const existingUser = await Student.findOne({ id: id });
  const existingUser = await Student.findOne({ id }); //ES6
  return existingUser;
};

//creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   // const existingUser = await Student.findOne({id:id})
//   const existingUser = await Student.findOne({id}) //ES6
//   return existingUser
// }

//create model

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
