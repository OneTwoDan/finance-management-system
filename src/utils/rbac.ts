import { Role } from "@prisma/client";

export const rbac = {
  hasRole: (userRole: string, requiredRoles: string[]) => requiredRoles.includes(userRole),
  requireAuth: (session: any) => !!(session && session.user),
  requireAdmin: (session: any) => session?.user?.role === Role.ADMIN,
};

