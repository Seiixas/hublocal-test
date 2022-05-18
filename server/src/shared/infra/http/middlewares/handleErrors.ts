import { NextFunction, Request, Response } from 'express';

import { AppError } from '../../../errors/AppError';

export function handleErrors(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.log('AppError');
  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
}
