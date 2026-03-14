import { prisma } from '../lib/prisma.js';

export const store = async (req, res, next) => {
  try {
    await prisma.file.create({
      data: {
        name: req.file.originalname,
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
