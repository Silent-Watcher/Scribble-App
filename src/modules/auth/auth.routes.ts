import { validateBody } from '$app/common/validation/dataValidator';
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

export default router;
