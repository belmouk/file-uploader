import passport from 'passport';

export const authenticate = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res
        .status(401)
        .render('index', { errors: [{ msg: 'Incorrect username.' }], user: undefined });
    req.login(user, (err) => {
      if (err) return next(err);
      res.redirect('/folders');
    });
  })(req, res, next);
};

export const ensureAuth = (req, res, next) => {
  if (req.user) return next();
  return res.redirect('/');
};

export const logout = (req, res, next) => {
  if (req.user) {
    req.logout((err) => {
      if (err) return next(err);
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
};
