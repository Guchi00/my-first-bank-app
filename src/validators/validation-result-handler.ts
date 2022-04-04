import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const validationResultHandler = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  console.log(errors, 'errors')
  if (!errors.isEmpty()) {
    res.status(400).json({ message: 'A validation error occurred', errors: errors.array() });
  } else {
    next();
  }
};
