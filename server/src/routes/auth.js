import { Router } from 'express';

import * as authController from '../controllers/auth';

const router = Router();

router.get('/github/oauth/callback', authController.githubCallback);

export default router;
