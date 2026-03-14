import { Router } from 'express';

import * as foldersController from '../controllers/folders.controller.js';
import { folderRules, handleFolderValidation } from '../middlewares/folders.validator.js';

const router = new Router();

router.get('/{:id}', foldersController.index);
router.get('/edit/:id', foldersController.edit);
router.get('/create/:parentId', foldersController.create);

router.post(
  '/store/:parentId',
  folderRules,
  handleFolderValidation('create'),
  foldersController.store,
);

router.post('/delete/:id', foldersController.destroy);

router.post('/update/:id', folderRules, handleFolderValidation('edit'), foldersController.update);

export default router;
