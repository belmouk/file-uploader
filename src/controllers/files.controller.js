import { Readable } from 'stream';

import { v2 as cloudinary } from 'cloudinary';

import { prisma } from '../lib/prisma.js';

cloudinary.config({ secure: true });

export const store = async (req, res, next) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: `uploads/${req.user.id}`, resource_type: 'auto' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      const bufferStream = new Readable();
      bufferStream.push(req.file.buffer);
      bufferStream.push(null);
      bufferStream.pipe(uploadStream);
    });
    await prisma.file.create({
      data: {
        name: req.file.originalname,
        size: req.file.size,
        url: result.secure_url,
        publicId: result.public_id,
        folder: {
          connect: { id: parseInt(req.params.folderId, 10) },
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
    const file = await prisma.file.findUnique({ where: { id: parseInt(req.params.id, 10) } });
    return res.render('files/show', { file });
  } catch (error) {
    next(error);
  }
};

export const download = async (req, res, next) => {
  try {
    const file = await prisma.file.findUnique({ where: { id: parseInt(req.params.id, 10) } });
    const url = cloudinary.url(file.publicId, {
      resource_type: 'raw',
      flags: `attachment`,
    });
    return res.redirect(url);
  } catch (error) {
    next(error);
  }
};
