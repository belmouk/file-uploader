import { Router } from 'express';
import multer from 'multer';

import * as filesController from '../controllers/files.controller.js';

const storage = multer.memoryStorage();

const upload = multer({ storage });

const router = Router();

router.post('/store/:folderId', upload.single('file'), filesController.store);

router.get('/show/:id', filesController.show);

router.get('/download/:id', filesController.download);

export default router;
