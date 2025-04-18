import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}

//Functional middleware should use:when it’s simple and doesn’t require dependency injection.
/*
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
};*/
