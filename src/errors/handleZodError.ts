import httpStatus from 'http-status';
import { ZodError } from 'zod';
import { IErrorResponse } from '../interfaces/types';

export const handleZodError = (error: ZodError): IErrorResponse => {
  const errorSources = error?.issues?.map((item) => ({
    path: (item?.path?.[item?.path?.length - 1] || '')?.toString(),
    message: item?.message,
  }));

  return {
    success: false,
    message: 'Validation Error',
    errorSources: errorSources || [],
    statusCode: httpStatus.BAD_REQUEST,
  };
};
