import { removeEmptyValues } from '$app/common/middlewares/omitEmpty.middleware';
import { validateBody } from '$app/common/validation/dataValidator';
import { zUser } from '$app/common/validation/schema/user.schema';
import { Router } from 'express';

import {
  getLoginPage,
  getRegisterPage,
  login,
  register,
} from './auth.controller';

const router = Router();

router.get('/register', getRegisterPage);
router.post('/register', removeEmptyValues(), validateBody(zUser), register);

router.get('/login', getLoginPage);
router.post('/login', removeEmptyValues(), validateBody(zUser), login);

export default router;
