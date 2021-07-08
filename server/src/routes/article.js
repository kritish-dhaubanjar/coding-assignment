import { Router } from 'express';

import * as articleController from '../controllers/article';
import { verifyAccessToken } from '../middlewares/verification';
import { validateQuery, validateUpsert } from '../validators/article';

const router = Router();

router.get('/articles', articleController.articles);

router.get('/articles/:id', [validateQuery], articleController.show);

router.post(
  '/articles',
  [validateUpsert, verifyAccessToken],
  articleController.store
);

router.put(
  '/articles/:id',
  [validateQuery, validateUpsert, verifyAccessToken],
  articleController.update
);

router.delete(
  '/articles/:id',
  [validateQuery, verifyAccessToken],
  articleController.destroy
);

export default router;
