// src/routes/ReservationRoutes.ts

import { Router } from 'express';
import { ReservationController } from '../controllers/ReservationController';
import { reservationService } from '../container';

const router = Router();

// Inject the service from the container
const reservationController = new ReservationController(reservationService);

router.post('/', reservationController.createReservation);
router.get('/', reservationController.getUserReservations);
router.patch('/:id/status', reservationController.updateStatus);

export default router;
