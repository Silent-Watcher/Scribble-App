import type { LoginDto, RegisterDto } from '$validation/schema/auth.schema';
import type { Request, Response, NextFunction } from 'express';
import { Controller } from '$interfaces/Controller';
import httpStatus from 'http-status';

import { authMessages } from './auth.messages';
import authService from './auth.service';

class AuthController extends Controller {
  private service;

  constructor() {
    super();
    this.service = authService;
  }

  getRegisterPage(_req: Request, res: Response, next: NextFunction) {
    try {
      res.render('register');
    } catch (error) {
      next(error);
    }
  }

  getLoginPage(_req: Request, res: Response, next: NextFunction) {
    try {
      res.render('login');
    } catch (error) {
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as RegisterDto;

      // check for duplicate email value
      const isEmailValueDuplicated = await this.service.isEmailAlreadyExists(
        dto.email,
      );

      if (isEmailValueDuplicated) {
        res.status(httpStatus.CONFLICT).send({
          status: res.statusCode,
          error: {
            code: 'CONFLICT',
            message: authMessages.duplicateEmailValue,
          },
        });
        return;
      }

      const { email, displayName } = await this.service.register(dto);

      res.status(httpStatus.OK).send({
        status: res.statusCode,
        code: 'OK',
        message: authMessages.registeredSuccessfully,
        user: {
          ...(displayName
            ? { displayName: displayName, email: email }
            : { email: email }),
        },
      });
      return;
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as LoginDto;

      await this.service.login(dto);

      res.status(httpStatus.OK).send({
        status: res.statusCode,
        code: 'OK',
        message: authMessages.loginSuccessfully,
      });
      return;
    } catch (error) {
      next(error);
    }
  }

  //   async verifyEmail(req: Request, res: Response, next: NextFunction){
  // 	try {

  // 	} catch (error) {
  // 		next(error);
  // 	}
  //   }
}

export default new AuthController();
