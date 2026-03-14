import { NextApiRequest, NextApiResponse } from "next";
import { MovementService } from "@/services/MovementService";
import { requireAuth, AuthenticatedSession } from "@/utils/middleware";
import { rbac } from "@/utils/rbac";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  session: AuthenticatedSession
) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid movement id" });
  }

  // Both PUT and DELETE require ADMIN
  if (!rbac.requireAdmin(session)) {
    console.warn(`[API] Access denied for user ${session.user.email}. Role: ${session.user.role}`);
    return res.status(403).json({ 
      error: "Forbidden: insufficient permissions",
      details: `Required: ADMIN, Found: ${session.user.role}`
    });
  }

  if (req.method === "PUT") {
    try {
      console.log(`[API] Updating movement ${id}`, req.body);
      const updated = await MovementService.updateMovement(id, req.body);
      return res.status(200).json(updated);
    } catch (error: any) {
      console.error(`[API] Update error for ${id}:`, error);
      return res.status(500).json({ 
        error: "Failed to update movement", 
        message: error.message,
        code: error.code // Prisma error codes
      });
    }
  }

  if (req.method === "DELETE") {
    try {
      console.log(`[API] Deleting movement ${id}`);
      await MovementService.deleteMovement(id);
      return res.status(204).end();
    } catch (error: any) {
      console.error(`[API] Delete error for ${id}:`, error);
      return res.status(500).json({ 
        error: "Failed to delete movement",
        message: error.message,
        code: error.code
      });
    }
  }

  res.setHeader("Allow", ["PUT", "DELETE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default requireAuth(handler);
