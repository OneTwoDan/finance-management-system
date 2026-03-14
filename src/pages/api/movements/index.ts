import { NextApiRequest, NextApiResponse } from "next";
import { MovementService } from "@/services/MovementService";
import { requireAuth, AuthenticatedSession } from "@/utils/middleware";
import { rbac } from "@/utils/rbac";
import { Role } from "@prisma/client";

/**
 * @swagger
 * /api/movements:
 *   get:
 *     summary: Retrieve a list of movements
 *     description: Returns a list of all movements for the authenticated user.
 *     tags: [Movements]
 *     responses:
 *       200:
 *         description: A list of movements.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 123
 *                   concept:
 *                     type: string
 *                     example: Pago de Cliente
 *                   amount:
 *                     type: number
 *                     example: 2500
 *                   date:
 *                     type: string
 *                     example: 2023-10-12
 *                   userId:
 *                     type: string
 *                     example: abc
 *                   createdAt:
 *                     type: string
 *                     example: 2023-10-12T10:00:00Z
 *   post:
 *     summary: Create a new movement
 *     description: Creates a new financial movement. Requires ADMIN role.
 *     tags: [Movements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - concept
 *               - amount
 *               - date
 *             properties:
 *               concept:
 *                 type: string
 *                 example: Alquiler
 *               amount:
 *                 type: number
 *                 example: -1200
 *               date:
 *                 type: string
 *                 example: 2023-10-10
 *     responses:
 *       201:
 *         description: Movement created successfully.
 *       403:
 *         description: Forbidden. Insufficient permissions.
 */

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  session: AuthenticatedSession
) {
  if (req.method === "GET") {
    // GET /api/movements -> authenticated user (handled by requireAuth wrapper)
    try {
      const movements = await MovementService.getMovements();
      return res.status(200).json(movements);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch movements" });
    }
  }

  if (req.method === "POST") {
    // POST /api/movements -> ADMIN
    if (!rbac.requireAdmin(session)) {
      return res.status(403).json({ error: "Forbidden: insufficient permissions" });
    }

    try {
      const data = { ...req.body, userId: session.user.id };
      const newMovement = await MovementService.createMovement(data);
      return res.status(201).json(newMovement);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create movement" });
    }
  }

  // Handle any other HTTP method
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default requireAuth(handler);
