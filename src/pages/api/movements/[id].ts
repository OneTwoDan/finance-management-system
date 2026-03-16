import { NextApiRequest, NextApiResponse } from "next";
import { MovementService } from "@/services/MovementService";
import { requireAuth, AuthenticatedSession } from "@/utils/middleware";
import { rbac } from "@/utils/rbac";

/**
 * @swagger
 * /api/movements/{id}:
 *   put:
 *     summary: Update a movement
 *     description: Modifies an existing movement. Requires ADMIN role.
 *     tags: [Movements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the movement to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               concept:
 *                 type: string
 *                 example: Pago de Servidor
 *               amount:
 *                 type: number
 *                 example: -1200
 *               date:
 *                 type: string
 *                 example: 2023-11-01
 *     responses:
 *       200:
 *         description: Movement updated successfully.
 *       400:
 *         description: Invalid movement ID.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 *       500:
 *         description: Server error.
 *   delete:
 *     summary: Delete a movement
 *     description: Deletes an existing movement by ID. Requires ADMIN role.
 *     tags: [Movements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the movement to delete.
 *     responses:
 *       204:
 *         description: Movement deleted successfully.
 *       400:
 *         description: Invalid movement ID.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 *       500:
 *         description: Server error.
 */
async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  session: AuthenticatedSession
) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid movement id" });
  }

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
        code: error.code
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
