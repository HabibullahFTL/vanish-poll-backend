import { Response } from 'express';
import { IResponse } from '../interfaces/types';

export const generateResponse = <T>({
  success,
  message,
  data,
  meta,
  errorSources,
  stack,
}: Omit<IResponse<T>, 'statusCode'> & { stack?: string }): Omit<
  IResponse<T>,
  'statusCode'
> & { stack?: string } => {
  const isSuccess = success || false;

  return {
    success: isSuccess,
    message,
    data: isSuccess ? data : undefined,
    meta: isSuccess ? meta : undefined,
    errorSources: isSuccess ? undefined : errorSources,
    stack: isSuccess ? undefined : stack,
  };
};

// Handles sending response
export const sendResponse = <T>(
  res: Response,
  responseData: IResponse<T> & { stack?: string }
) => {
  // Sending response
  res.status(responseData?.statusCode).json(generateResponse(responseData));
};
