import { body, matchedData, validationResult } from 'express-validator';

import { prisma } from '../lib/prisma.js';

export const userSignUpRules = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Please enter your username.')
    .bail()
    .isLength({ max: 50 })
    .withMessage('Invalid username: username must be below 50 characters.')
    .bail()
    .isAlphanumeric()
    .withMessage('Invalid username: username must be alphanumeric.')
    .custom(async (input) => {
      const username = await prisma.user.findUnique({ where: { username: input } });
      if (username) throw new Error('Username already exists.');
    }),
  body('password')
    .notEmpty()
    .withMessage('Please enter your password.')
    .bail()
    .isLength({ max: 8 })
    .withMessage('Invalid password. Password must be below 8 characters.'),
];

export const userLoginRules = [
  body('username').trim().notEmpty().withMessage('Please enter your username.'),
  body('password').notEmpty().withMessage('Please enter your password.'),
];

export const handleUserValidation = (view) => {
  return (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render(view, { errors: errors.array() });
    }
    req.body = matchedData(req);
    return next();
  };
};
