import { ReservationStatus } from '@prisma/client';

export { ReservationStatus };

export interface Reservation {
  id: number;
  userId: number; // guest id
  caravanId: number;
  startDate: Date;
  endDate: Date;
  status: ReservationStatus;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
