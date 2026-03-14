import { Role } from "@prisma/client";

export const rbac = {
  isAdmin: (role: string) => role === Role.ADMIN,
  
  canAccessUsers: (role: string) => role === Role.ADMIN,
  canAccessReports: (role: string) => role === Role.ADMIN,
  canAccessMovements: (role: string) => role === Role.ADMIN || role === Role.USER,
};
