import { Router } from 'express';

import type { Application, NextFunction, Request, Response } from 'express';
const router = Router();

router.get('/', (_req: Request, res: Response, _next: NextFunction) => {
  res.render('landing' , {layout:false});
});

export function startRouter(app: Application, appRouter: Router = router) {
  app.use(appRouter);
}
