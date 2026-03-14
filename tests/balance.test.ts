import { describe, it, expect } from 'vitest';
import { Movement } from '@/types';

/**
 * Calculates the current balance from a list of movements.
 * Income (positive amounts) and expenses (negative amounts) are summed.
 */
function calculateBalance(movements: Movement[]): number {
  return movements.reduce((acc, m) => acc + m.amount, 0);
}

describe('Balance Calculation', () => {
  it('should return 0 for an empty movements list', () => {
    expect(calculateBalance([])).toBe(0);
  });

  it('should sum income correctly', () => {
    const movements: Movement[] = [
      { id: '1', concept: 'Ingreso A', amount: 1000, date: '2024-01-01', userId: 'u1', createdAt: '' },
      { id: '2', concept: 'Ingreso B', amount: 500,  date: '2024-01-02', userId: 'u1', createdAt: '' },
    ];
    expect(calculateBalance(movements)).toBe(1500);
  });

  it('should subtract expenses correctly', () => {
    const movements: Movement[] = [
      { id: '1', concept: 'Ingreso',  amount: 2000,  date: '2024-01-01', userId: 'u1', createdAt: '' },
      { id: '2', concept: 'Alquiler', amount: -1200, date: '2024-01-02', userId: 'u1', createdAt: '' },
    ];
    expect(calculateBalance(movements)).toBe(800);
  });

  it('should handle a negative balance', () => {
    const movements: Movement[] = [
      { id: '1', concept: 'Gasto grande', amount: -5000, date: '2024-01-01', userId: 'u1', createdAt: '' },
    ];
    expect(calculateBalance(movements)).toBe(-5000);
  });
});
