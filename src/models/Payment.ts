import { PaymentStatus } from '@prisma/client';

export { PaymentStatus };

export interface Payment {
  id: number;
  reservationId: number;
  userId?: number | null;
  amount: number;
  paymentDate: Date;
  status: PaymentStatus;
}
