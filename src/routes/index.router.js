import { Router } from 'express';

import { authenticate, logout } from '../controllers/auth.controller.js';
import * as usersController from '../controllers/users.controller.js';
import { userRules, handleUserValidation } from '../middlewares/users.validator.js';

const router = Router();

router.get('/', (req, res) => res.render('index', { errors: [], user: req?.user }));

router.get('/log-in', (req, res) => res.render('index', { errors: [], user: req?.user }));
router.post('/log-in', userRules, handleUserValidation('index'), authenticate);

router.get('/log-out', logout);

router.get('/sign-up', usersController.signUp);

export default router;
