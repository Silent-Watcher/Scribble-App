import type { Request, Response, NextFunction } from 'express';

export function register(_req: Request, _res: Response, next: NextFunction) {
  try {
    console.log('aa');
  } catch (error) {
    next(error);
  }
}

export function getRegisterPage(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    res.render('register');
  } catch (error) {
    next(error);
  }
}

export function getLoginPage(_req: Request, res: Response, next: NextFunction) {
  try {
    res.render('login');
  } catch (error) {
    next(error);
  }
}

export async function login(_req: Request, _res: Response, next: NextFunction) {
  try {
    console.log('logging');
  } catch (error) {
    next(error);
  }
}
