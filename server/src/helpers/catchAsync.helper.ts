import { Request, Response, NextFunction } from 'express'

export const catchAsync =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch((err) => next(err))
  }
