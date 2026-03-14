import { Router } from 'express';
import multer from 'multer';

import * as filesController from '../controllers/files.controller.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const router = Router();

router.post('/store/:folderId', upload.single('file'), filesController.store);

export default router;
