import Joi from 'joi';

const studentValidationSchemaWithJoi = Joi.object({
  id: Joi.string().required(),
  name: Joi.object({
    firstName: Joi.string()
      .trim()
      .max(20)
      .regex(/^[A-Z][a-z]*$/)
      .required()
      .messages({
        'string.pattern.base':
          'First name must start with a capital letter and contain only alphabets.',
      }),
    middleName: Joi.string().trim().allow(null, ''),
    lastName: Joi.string()
      .trim()
      .regex(/^[A-Za-z]+$/)
      .required()
      .messages({
        'string.pattern.base': 'Last name must contain only alphabets.',
      }),
  }).required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-')
    .optional(),
  presentAddress: Joi.string().required(),
  parmanentAddress: Joi.string().required(),
  guardian: Joi.object({
    fatherName: Joi.string().required(),
    fatherOccupation: Joi.string().required(),
    fatherContactNo: Joi.string().required(),
    motherName: Joi.string().required(),
    motherOccupation: Joi.string().required(),
    motherContactNo: Joi.string().required(),
  }).required(),
  localGuardian: Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    contactNo: Joi.string().required(),
    address: Joi.string().required(),
  }).required(),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'bloked').default('active'),
});

export default studentValidationSchemaWithJoi;