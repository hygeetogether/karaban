import client from '../api/client';

export interface CreateReservationDto {
    userId: number;
    caravanId: number;
    startDate: string; // YYYY-MM-DD
    endDate: string;   // YYYY-MM-DD
    totalPrice: number;
}

export const reservationService = {
    create: async (data: CreateReservationDto) => {
        const response = await client.post('/reservations', data);
        return response.data;
    },

    getMyReservations: async (userId: number) => {
        const response = await client.get(`/reservations?userId=${userId}`);
        return response.data;
    }
};
