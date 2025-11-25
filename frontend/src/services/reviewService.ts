import client from '../api/client';

export interface Review {
    id: number;
    reservationId: number;
    reviewerId: number;
    revieweeId: number;
    rating: number;
    comment: string;
    reviewDate: string;
}

export interface CreateReviewDto {
    reservationId: number;
    reviewerId: number;
    rating: number;
    comment: string;
}

export const reviewService = {
    create: async (data: CreateReviewDto) => {
        const response = await client.post('/reviews', data);
        return response.data;
    },

    getByCaravanId: async (caravanId: number) => {
        const response = await client.get<Review[]>(`/reviews/caravan/${caravanId}`);
        return response.data;
    }
};
