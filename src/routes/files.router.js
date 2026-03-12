import { Router } from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: async function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const router = Router();

router.post('/store', upload.single('file'), (req, res) => {
  console.log(req.file);
  res.redirect('/');
});

export default router;
