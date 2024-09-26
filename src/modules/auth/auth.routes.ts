import { Router } from 'express';

import {
  getLoginPage,
  getRegisterPage,
  login,
  register,
} from './auth.controller';

const router = Router();

router.get('/register', getRegisterPage);
router.post('/register', register);

router.get('/login', getLoginPage);
router.post('/login', login);

export default router;
