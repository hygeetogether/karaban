// src/routes/PaymentRoutes.ts

import { Router } from 'express';
import { PaymentController } from '../controllers/PaymentController';
import { paymentService } from '../container';

const router = Router();
const controller = new PaymentController(paymentService);

router.post('/', controller.create);
router.get('/:id', controller.getById);
router.get('/user/:userId', controller.getHistory);

export default router;
