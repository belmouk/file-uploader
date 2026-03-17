import { Router } from 'express';

import * as foldersController from '../controllers/folders.controller.js';
import * as usersController from '../controllers/users.controller.js';
import { handleUserValidation, userSignUpRules } from '../middlewares/users.validator.js';

const router = Router();

router.post(
  '/store',
  userSignUpRules,
  handleUserValidation('users/sign-up'),
  usersController.store,
  foldersController.createRoot,
  (req, res) => res.redirect('/'),
);

export default router;
