import { NextApiRequest, NextApiResponse } from "next";
import { MovementService } from "@/services/MovementService";
import { movementsToCsv } from "@/utils/csv";
import { requireAuth, AuthenticatedSession } from "@/utils/middleware";
import { rbac } from "@/utils/rbac";

/**
 * @swagger
 * /api/reports/csv:
 *   get:
 *     summary: Download movements as CSV
 *     description: Generates and returns a CSV file with all movements. Requires ADMIN role.
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: A CSV file of all movements.
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *       403:
 *         description: Forbidden. Insufficient permissions.
 */
async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  session: AuthenticatedSession
) {
  if (!rbac.requireAdmin(session)) {
    return res.status(403).json({ error: "Forbidden: insufficient permissions" });
  }

  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const movements = await MovementService.getMovements();
    const csv = movementsToCsv(movements);

    const filename = `movements-${new Date().toISOString().split("T")[0]}.csv`;

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    return res.status(200).send(csv);
  } catch (error) {
    return res.status(500).json({ error: "Failed to generate CSV" });
  }
}

export default requireAuth(handler);
