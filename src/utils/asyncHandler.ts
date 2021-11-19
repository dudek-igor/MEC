import { NextFunction, Request, Response } from 'express';

export const asyncHandler = function (fn) {
  return function (req: Request, res: Response, next: NextFunction): Promise<Response> {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
};
