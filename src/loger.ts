import { Response, Request } from 'express';

export const logger = (
  request: Request,
  responce: Response,
  next: () => void,
): void => {
  console.log(`${request.method} ${request.originalUrl}`);
  next();
};
