export interface Review {
  id: number;
  reservationId: number;
  reviewerId: number;
  revieweeId: number;
  rating: number; // 1-5
  comment: string;
  reviewDate: Date;
}
