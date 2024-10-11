import { validateBody } from '$app/common/validation/data.validator';
import { validateRecaptchaV3 } from '$app/common/validation/recaptcha.validator';
import {
  zLoginDto,
  zRegisterDto,
} from '$app/common/validation/schema/auth.schema';
import { removeEmptyValues } from '$middlewares/omitEmpty.middleware';
import { Router } from 'express';

import authController from './auth.controller';

const router = Router();

router.get('/register', authController.getRegisterPage);
router.post(
  '/register',
  validateRecaptchaV3('register'),
  removeEmptyValues(),
  validateBody(zRegisterDto),
  authController.register,
);

router.get('/login', authController.getLoginPage);
router.post(
  '/login',
  removeEmptyValues(),
  validateBody(zLoginDto),
  authController.login,
);

// router.get('/verify-email', authController.verifyEmail)

export default router;
