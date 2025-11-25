// src/controllers/UserController.ts

import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  constructor(private service: UserService) { }

  create = async (req: Request, res: Response) => {
    try {
      const user = await this.service.create(req.body);
      res.status(201).json(user);
    } catch (e) {
      res.status(400).json({ error: (e as Error).message });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await this.service.getById(Number(id));
      res.json(user);
    } catch (e) {
      res.status(404).json({ error: (e as Error).message });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const users = await this.service.getAll();
      res.json(users);
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
    }
  };
}
