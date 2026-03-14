import { describe, it, expect } from 'vitest';
import { rbac } from '@/utils/rbac';

// --- Mock sessions ---
const adminSession = {
  user: { id: 'u1', role: 'ADMIN', email: 'admin@sgf.com', name: 'Admin' },
  session: { id: 's1', userId: 'u1', expiresAt: new Date() },
};

const userSession = {
  user: { id: 'u2', role: 'USER', email: 'user@sgf.com', name: 'Regular User' },
  session: { id: 's2', userId: 'u2', expiresAt: new Date() },
};

const noSession = null;

describe('RBAC Validation', () => {
  describe('requireAuth', () => {
    it('should return true for a valid session', () => {
      expect(rbac.requireAuth(adminSession)).toBe(true);
      expect(rbac.requireAuth(userSession)).toBe(true);
    });

    it('should return false for a null session', () => {
      expect(rbac.requireAuth(noSession)).toBe(false);
    });
  });

  describe('requireAdmin', () => {
    it('should return true for ADMIN role', () => {
      expect(rbac.requireAdmin(adminSession)).toBe(true);
    });

    it('should return false for USER role', () => {
      expect(rbac.requireAdmin(userSession)).toBe(false);
    });

    it('should return false for a null session', () => {
      expect(rbac.requireAdmin(noSession)).toBe(false);
    });
  });

  describe('hasRole', () => {
    it('should return true when the user role is in the allowed list', () => {
      expect(rbac.hasRole('ADMIN', ['ADMIN', 'USER'])).toBe(true);
    });

    it('should return true when USER is allowed', () => {
      expect(rbac.hasRole('USER', ['ADMIN', 'USER'])).toBe(true);
    });

    it('should return false when role is not in the allowed list', () => {
      expect(rbac.hasRole('USER', ['ADMIN'])).toBe(false);
    });

    it('should return false for an empty allowed list', () => {
      expect(rbac.hasRole('ADMIN', [])).toBe(false);
    });
  });
});
