import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import express from 'express';
import session from 'express-session';
import './config/auth.config.js';
import passport from 'passport';

import { prisma } from './lib/prisma.js';
import filesRouter from './routes/files.router.js';
import indexRouter from './routes/index.router.js';
import usersRouter from './routes/users.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 },
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 10 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);

app.use(passport.session());

app.use('/', indexRouter);
app.use('/files', filesRouter);
app.use('/users', usersRouter);

app.use((req, res) => res.status(404).render('404'));

app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).send('Internal server error');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is up, listening to port ${PORT}`);
});
