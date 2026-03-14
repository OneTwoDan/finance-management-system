import { describe, it, expect } from 'vitest';

/**
 * Validates movement creation input according to business rules.
 */
interface MovementInput {
  concept?: string;
  amount?: number;
  date?: string;
}

function validateMovement(input: MovementInput): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Concept is required and must not be empty
  if (!input.concept || input.concept.trim() === '') {
    errors.push('concept is required');
  }

  // Amount must be greater than 0
  if (input.amount === undefined || input.amount === null) {
    errors.push('amount is required');
  } else if (input.amount === 0) {
    errors.push('amount must not be zero');
  }

  // Date must be a valid date string
  if (!input.date) {
    errors.push('date is required');
  } else {
    const parsed = Date.parse(input.date);
    if (isNaN(parsed)) {
      errors.push('date must be a valid date');
    }
  }

  return { valid: errors.length === 0, errors };
}

describe('Movement Creation Validation', () => {
  it('should pass with valid data', () => {
    const result = validateMovement({ concept: 'Pago', amount: 500, date: '2024-01-15' });
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should fail when concept is missing', () => {
    const result = validateMovement({ concept: '', amount: 100, date: '2024-01-15' });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('concept is required');
  });

  it('should fail when amount is zero', () => {
    const result = validateMovement({ concept: 'Test', amount: 0, date: '2024-01-15' });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('amount must not be zero');
  });

  it('should fail when date is invalid', () => {
    const result = validateMovement({ concept: 'Test', amount: 100, date: 'not-a-date' });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('date must be a valid date');
  });

  it('should fail when multiple fields are missing', () => {
    const result = validateMovement({});
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(1);
  });

  it('should accept negative amounts (expenses)', () => {
    const result = validateMovement({ concept: 'Alquiler', amount: -1200, date: '2024-01-10' });
    expect(result.valid).toBe(true);
  });
});
