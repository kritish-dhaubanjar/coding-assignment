import { Router } from 'express';

import { validateCallback } from '../validators/auth';
import * as authController from '../controllers/auth';

const router = Router();

router.get(
  '/github/oauth/callback',
  [validateCallback],
  authController.githubCallback
);

export default router;
