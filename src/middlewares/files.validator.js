import { body, validationResult } from 'express-validator';

export const fileRules = [body('file').notEmpty()];

// export const handleFileValidation = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.render('storage', );
//   } else {
//     next();
//   }
// };
