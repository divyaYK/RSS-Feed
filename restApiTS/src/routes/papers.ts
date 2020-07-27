import { Router } from 'express';

const router: Router = Router();

import {
  getAllPapers,
  getPaperByTitle,
  getPaperByDate,
  getPapersByDateRange
} from '../controllers/paper.controller';
import { TokenValidation } from '../util/verifyToken';

router.get('/', TokenValidation, getAllPapers);
router.post('/get-by-title', TokenValidation, getPaperByTitle);
router.post('/get-by-date', TokenValidation, getPaperByDate);
router.post('/get-in-date-range', TokenValidation, getPapersByDateRange);

export default router;
