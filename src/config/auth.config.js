import bcrypt from 'bcryptjs';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { prisma } from '../lib/prisma.js';

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { username } });
      if (!user) return done(null, false, { message: 'Username is incorrect.' });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return done(null, false, { message: 'Password is incorrect.' });

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }),
);

passport.deserializeUser((id, done) => {
  try {
    const user = prisma.user.findUnique({ where: { id } });
    return done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (error) {
    done(error);
  }
});
