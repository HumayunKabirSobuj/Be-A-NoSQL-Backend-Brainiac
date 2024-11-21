import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

//create Schema

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is Required'],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is Required'],
  },
});

const gurdianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, 'Father Name is Required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is Required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father ContactNo is Required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is Required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is Required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother ContactNo is Required'],
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local Guardian Name is Required'],
  },
  occupation: {
    type: String,
    required: [true, 'Local Guardian occupation is Required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local Guardian ContactNo is Required'],
  },
  address: {
    type: String,
    required: [true, 'Local Guardian address is Required'],
  },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
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
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, 'Student email is Required'],
    unique: true,
  },
  contactNo: {
    type: String,
    required: [true, 'Student contactNo is Required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Student emergency contactNo is Required'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Student present address is Required'],
  },
  parmanentAddress: {
    type: String,
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
  isActive: {
    type: String,
    enum: ['active', 'bloked'],
    default: 'active',
  },
});

//create model

export const StudentModel = model<Student>('Student', studentSchema);
