import { Router } from 'express';

const router = Router();

router.post('/store', (req, res) => {
  console.log(req.body);
  res.redirect('/');
});

export default router;
