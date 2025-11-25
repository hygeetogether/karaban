// src/controllers/PaymentController.ts

import { Request, Response } from 'express';
import { PaymentService } from '../services/PaymentService';

export class PaymentController {
  constructor(private service: PaymentService) { }

  create = async (req: Request, res: Response) => {
    try {
      const { reservationId, amount } = req.body;
      const payment = await this.service.create(Number(reservationId), Number(amount));
      res.status(201).json(payment);
    } catch (e) {
      res.status(400).json({ error: (e as Error).message });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const payment = await this.service.getById(Number(id));
      res.json(payment);
    } catch (e) {
      res.status(404).json({ error: (e as Error).message });
    }
  };

  getHistory = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const payments = await this.service.getHistory(Number(userId));
      res.json(payments);
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
    }
  };
}
