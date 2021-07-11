import { Router } from 'express';

import { validateCallback } from '../validators/auth';
import * as authController from '../controllers/auth';
import { verifyAccessToken } from '../middlewares/verification';

const router = Router();

router.get('/auth/user', [verifyAccessToken], authController.authUser);

router.get(
  '/github/oauth/callback',
  [validateCallback],
  authController.githubCallback
);

export default router;
