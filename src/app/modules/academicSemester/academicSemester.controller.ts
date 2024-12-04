import sentResponse from '../../utils/sentResponse';
import HttpStatus from 'http-status';

import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const CreateAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  sentResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Academic Semester is created succesfully',
    data: result,
  });
});

export const academicSemesterControllers = {
  CreateAcademicSemester,
};
