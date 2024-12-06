import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic department must be a string ! ',
      required_error: 'Academic department name is required .',
    }),
    academicfaculty: z.string({
      invalid_type_error: 'Academic faculty must be a string ',
      required_error: 'academic faculty is requird',
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic faculty must be a string ! ',
      })
      .optional(),
    academicfaculty: z
      .string({
        invalid_type_error: 'Academic faculty must be a string ',
        required_error: 'academic faculty is requird',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
