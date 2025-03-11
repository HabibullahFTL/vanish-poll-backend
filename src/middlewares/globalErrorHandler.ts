import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import { handleZodError } from '../errors/handleZodError';
import { sendResponse } from '../utils/responseGenerator';

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  let statusCode = error?.statusCode || httpStatus.BAD_REQUEST;
  let message = error?.message || 'An unexpected error occurred';
  let stack = error?.stack || '';
  let errorSources = [{ path: '', message }];

  if (error?.name === 'ZodError') {
    const simplifiedError = handleZodError(error);
    sendResponse(res, simplifiedError);
  } else {
    sendResponse(res, {
      statusCode,
      message,
      errorSources,
      stack,
      success: false,
    });
  }
};
