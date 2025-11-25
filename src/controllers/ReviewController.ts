// src/controllers/ReviewController.ts

import { Request, Response } from 'express';
import { ReviewService } from '../services/ReviewService';

export class ReviewController {
  constructor(private service: ReviewService) { }

  create = async (req: Request, res: Response) => {
    try {
      const { reservationId, reviewerId, rating, comment } = req.body;
      const review = await this.service.create(
        Number(reservationId),
        Number(reviewerId),
        Number(rating),
        comment
      );
      res.status(201).json(review);
    } catch (e) {
      res.status(400).json({ error: (e as Error).message });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const review = await this.service.getById(Number(id));
      res.json(review);
    } catch (e) {
      res.status(404).json({ error: (e as Error).message });
    }
  };

  getByCaravanId = async (req: Request, res: Response) => {
    try {
      const { caravanId } = req.params;
      const reviews = await this.service.getByCaravanId(Number(caravanId));
      res.json(reviews);
    } catch (e) {
      res.status(400).json({ error: (e as Error).message });
    }
  };
}
