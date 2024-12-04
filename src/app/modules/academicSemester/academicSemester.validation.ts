import { z } from 'zod';
import {
  acedemicSemesterCode,
  acedemicSemesterName,
  Months,
} from './academicSemester.constant';

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...acedemicSemesterName] as [string, ...string[]]),
    year: z.string(),
    code: z.enum([...acedemicSemesterCode] as [string, ...string[]]),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
});

export const academicSemesterValidations = {
  createAcademicSemesterValidationSchema,
};
