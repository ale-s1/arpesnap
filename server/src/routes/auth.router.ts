import { Router } from 'express';
import { getProfile } from '../controllers/auth-controller';
import authenticateUser from '../middleware/authetication-user';

const router = Router();

router.get('/profile', authenticateUser, getProfile);

export default router;
