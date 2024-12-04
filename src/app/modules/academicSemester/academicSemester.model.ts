import { model, Schema } from 'mongoose';
import {
  TAcademicSemester,
} from './academicSemester.interface';
import { acedemicSemesterCode, acedemicSemesterName, Months } from './academicSemester.constant';


const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: acedemicSemesterName,
    },
    code: {
      type: String,
      required: true,
      enum: acedemicSemesterCode,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required:true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required:true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
);

export const academicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
