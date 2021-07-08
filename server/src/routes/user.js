import { Router } from 'express';

import { validateQuery } from '../validators/user';
import * as userController from '../controllers/user';

const router = Router();

router.get('/users', userController.index);

router.get('/users/:id', [validateQuery], userController.show);

router.get('/users/:id/articles', [validateQuery], userController.articles);

export default router;
