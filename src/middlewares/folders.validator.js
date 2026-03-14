import { body, matchedData, validationResult } from 'express-validator';

import { prisma } from '../lib/prisma.js';

export const folderRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Please enter a folder name')
    .isLength({ max: 50 })
    .withMessage('Folder names must be below 50 characters.')
    .custom(async (input, { req }) => {
      const subFoldersName = await prisma.folder.findMany({
        where: { parentId: parseInt(req.params.parentId) },
        select: { name: true },
      });
      const exists = subFoldersName.some((folder) => folder.name === input);
      if (exists) throw new Error('Folder already exists. Please choose another name.');
    }),
];

export const handleFolderValidation = (view) => {
  return (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render(view, { errors: errors.array(), parentId: req.params.parentId });
    } else {
      req.body = matchedData(req);
      next();
    }
  };
};
