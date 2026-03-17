import { prisma } from '../lib/prisma.js';

export const store = async (req, res, next) => {
  try {
    await prisma.file.create({
      data: {
        name: req.file.originalname,
        size: req.file.size,
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
    const file = await prisma.file.findUnique({ where: { id: req.params.id } });
    return res.render('files/show', { file });
  } catch (error) {
    next(error);
  }
};
