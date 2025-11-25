import client from '../api/client';

export interface Payment {
    id: number;
    reservationId: number;
    userId: number;
    amount: number;
    paymentDate: string;
    status: string;
}

export interface CreatePaymentDto {
    reservationId: number;
    amount: number;
}

export const paymentService = {
    create: async (data: CreatePaymentDto) => {
        const response = await client.post('/payments', data);
        return response.data;
    },

    getHistory: async (userId: number) => {
        const response = await client.get<Payment[]>(`/payments/user/${userId}`);
        return response.data;
    }
};
