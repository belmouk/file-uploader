import { prisma } from '../lib/prisma.js';

export const createRoot = async (req, res, next) => {
  try {
    await prisma.folder.create({
      data: {
        name: 'root',
        owner: { connect: { id: req.owner.id } },
      },
    });
    next();
  } catch (error) {
    next(error);
  }
};

const getCwd = async (folder) => {
  let selected = await prisma.folder.findUnique({ where: { id: folder.id } });
  let cwd = selected.name;
  while (selected.parentId) {
    selected = await prisma.folder.findUnique({ where: { id: selected.parentId } });
    cwd = selected.name + '/' + cwd;
  }
  return cwd;
};

export const index = async (req, res, next) => {
  try {
    let folder;

    if (!req.params.id) {
      folder = await prisma.folder.findFirst({
        where: { parentId: null },
        include: { children: true, files: true, parent: true },
      });
    } else {
      folder = await prisma.folder.findUnique({
        where: { id: parseInt(req.params.id) },
        include: { children: true, files: true, parent: true },
      });
    }

    const cwd = await getCwd(folder);
    const parent = folder.parent || folder;

    return res.render('folders/storage', {
      cwd,
      folder,
      parent,
      folderFromErrors: [],
      fileFormErrors: [],
    });
  } catch (error) {
    next(error);
  }
};

export const store = async (req, res, next) => {
  try {
    await prisma.folder.create({
      data: {
        name: req.body.name,
        parent: { connect: { id: parseInt(req.params.parentId) } },
        owner: { connect: { id: req.user.id } },
      },
    });
    return res.redirect(`/folders/${req.params.parentId}`);
  } catch (error) {
    next(error);
  }
};

export const destroy = async (req, res, next) => {
  try {
    const folder = await prisma.folder.delete({ where: { id: parseInt(req.params.id) } });
    return res.redirect(`/folders/${folder.parentId}`);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const folder = await prisma.folder.update({
      where: { id: parseInt(req.params.id) },
      data: { name: req.body.name },
    });
    return res.redirect(`/folders/${folder.parentId}`);
  } catch (error) {
    next(error);
  }
};

export const edit = async (req, res, next) => {
  try {
    const folder = await prisma.folder.findUnique({ where: { id: parseInt(req.params.id) } });
    return res.render('folders/edit', { folder, errors: [] });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  return res.render('folders/create', { errors: [], parentId: req.params.parentId });
};
