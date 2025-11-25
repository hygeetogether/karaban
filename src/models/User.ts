import { Role } from '@prisma/client';

export { Role };

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  role: Role;
  rating?: number | null; // 1-5 average rating
  createdAt: Date;
  updatedAt: Date;
}
