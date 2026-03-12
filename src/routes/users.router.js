import { Router } from 'express';

import { ensureAuth } from '../controllers/auth.controller.js';
import * as usersController from '../controllers/users.controller.js';
import { userRules, handleUserValidation } from '../middlewares/users.validator.js';

const router = Router();
router.post(
  '/store',
  ensureAuth,
  userRules,
  handleUserValidation('sign-up'),
  usersController.store,
);

export default router;
