import { Router } from 'express';

import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import articleRoutes from './routes/article';

const router = Router();

router.use(authRoutes);
router.use(userRoutes);
router.use(articleRoutes);

export default router;
