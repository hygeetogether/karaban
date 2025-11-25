// src/routes/ReviewRoutes.ts

import { Router } from 'express';
import { ReviewController } from '../controllers/ReviewController';
import { reviewService } from '../container';

const router = Router();
const controller = new ReviewController(reviewService);

router.post('/', controller.create);
router.get('/:id', controller.getById);
router.get('/caravan/:caravanId', controller.getByCaravanId);

export default router;
