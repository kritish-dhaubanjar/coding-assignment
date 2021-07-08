import { Router } from 'express';

import authRoutes from './routes/auth';
import userRoutes from './routes/user';

const router = Router();

router.use(authRoutes);
router.use(userRoutes);

export default router;
