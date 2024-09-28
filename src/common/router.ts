import authRouter from '$modules/auth/auth.routes';
import { Router } from 'express';
import httpStatus from 'http-status';

import type { Application, NextFunction, Request, Response } from 'express';
const router = Router();

router.get('/', (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.render('landing');
  } catch (error) {
    next(error);
  }
});

router.use('/auth', authRouter);

router.get('/about', (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.render('about');
  } catch (error) {
    next(error);
  }
});

router.get('/health', (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(httpStatus.OK).send({
      status: res.statusCode,
      code: 'OK',
      message: 'server is up and running ...',
    });
    return;
  } catch (error) {
    next(error);
  }
});

export function startRouter(app: Application, appRouter: Router = router) {
  app.use(appRouter);
}
