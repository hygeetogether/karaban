// src/routes/UserRoutes.ts

import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { userService } from '../container';

const router = Router();
const controller = new UserController(userService);

router.post('/', controller.create);
router.get('/:id', controller.getById);
router.get('/', controller.getAll);

export default router;
