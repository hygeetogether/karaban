// src/controllers/CaravanController.ts

import { Request, Response } from 'express';
import { CaravanService } from '../services/CaravanService';

export class CaravanController {
  constructor(private service: CaravanService) { }

  create = async (req: Request, res: Response) => {
    try {
      const caravan = await this.service.create(req.body);
      res.status(201).json(caravan);
    } catch (e) {
      res.status(400).json({ error: (e as Error).message });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const caravan = await this.service.getById(Number(id));
      res.json(caravan);
    } catch (e) {
      res.status(404).json({ error: (e as Error).message });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const { location, minPrice, maxPrice } = req.query;
      const filters = {
        location: location as string,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined
      };
      const caravans = await this.service.getAll(filters);
      res.json(caravans);
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
    }
  };
}
