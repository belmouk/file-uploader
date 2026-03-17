import fs from 'node:fs/promises';

import { prisma } from '../lib/prisma.js';

export const store = async (req, res, next) => {
  try {
    console.log(req.file);
    await prisma.file.create({
      data: {
        name: req.file.originalname,
        size: req.file.size,
        path: req.file.path,
        folder: {
          connect: { id: parseInt(req.params.folderId) },
        },
      },
    });
    return res.redirect(`/folders/${req.params.folderId}`);
  } catch (error) {
    next(error);
  }
};

export const show = async (req, res, next) => {
  try {
    const file = await prisma.file.findUnique({ where: { id: parseInt(req.params.id) } });
    return res.render('files/show', { file });
  } catch (error) {
    next(error);
  }
};

export const download = async (req, res, next) => {
  try {
    const fileMetaData = await prisma.file.findUnique({ where: { id: parseInt(req.params.id) } });
    return res.download(fileMetaData.path, fileMetaData.name);
  } catch (error) {
    next(error);
  }
};
