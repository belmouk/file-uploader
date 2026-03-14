import { Router } from 'express';

import * as foldersController from '../controllers/folders.controller.js';
import * as usersController from '../controllers/users.controller.js';
import { userRules, handleUserValidation } from '../middlewares/users.validator.js';

const router = Router();

router.post(
  '/store',
  userRules,
  handleUserValidation('sign-up'),
  usersController.store,
  foldersController.createRoot,
  (req, res) => res.redirect('/log-in'),
);

export default router;
