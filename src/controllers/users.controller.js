import bcrypt from 'bcryptjs';

import { prisma } from '../lib/prisma.js';

export const store = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await prisma.user.create({
      data: {
        username: req.body.username,
        password: hashedPassword,
      },
    });
    return res.redirect('/log-in');
  } catch (error) {
    return next(error);
  }
};

export const signUp = (req, res) => {
  if (req.user) {
    return res.redirect('/');
  } else {
    res.render('sign-up', { errors: [] });
  }
};
