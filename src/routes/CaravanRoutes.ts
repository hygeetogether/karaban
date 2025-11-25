// src/routes/CaravanRoutes.ts

import { Router } from 'express';
import { CaravanController } from '../controllers/CaravanController';
import { caravanService } from '../container';

const router = Router();
const controller = new CaravanController(caravanService);

router.post('/', controller.create);
router.get('/:id', controller.getById);
router.get('/', controller.getAll);

export default router;
