import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from 'express-oauth2-jwt-bearer';

export default function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof UnauthorizedError) {
    res.status(error.statusCode).json({
      error: {
        message: error.message,
        code: 'code' in error ? error.code : 'ERR_AUTH',
      },
    });
    return;
  }
}
