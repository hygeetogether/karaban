jest.mock('../src/lib/prisma', () => ({
    __esModule: true,
    default: {
        user: { findUnique: jest.fn(), findMany: jest.fn(), create: jest.fn(), update: jest.fn() },
        caravan: { findUnique: jest.fn(), findMany: jest.fn(), create: jest.fn(), update: jest.fn() },
        reservation: { findUnique: jest.fn(), findMany: jest.fn(), create: jest.fn(), update: jest.fn() },
        payment: { findUnique: jest.fn(), findMany: jest.fn(), create: jest.fn(), update: jest.fn() },
        review: { findUnique: jest.fn(), findMany: jest.fn(), create: jest.fn(), update: jest.fn() },
    },
}));

import prisma from '../src/lib/prisma';

describe('Prisma Mock', () => {
    it('should be mocked', () => {
        expect(prisma).toBeDefined();
        expect(prisma.user).toBeDefined();
    });
});
