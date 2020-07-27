import { Router } from 'express';

const router: Router = Router();

import { signup, login, profile } from '../controllers/auth.controller';
import { TokenValidation } from '../util/verifyToken';

router.post('/signup', signup);
router.post('/login', login);

// protected routes
router.get('/profile', TokenValidation, profile);

export default router;
