import { Router } from 'express';

import * as userController from '../controllers/user';

const router = Router();

router.get('/users', userController.index);

router.get('/users/:id', userController.show);

export default router;
