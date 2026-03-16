import { NextApiRequest, NextApiResponse } from "next";
import { ReportService } from "@/services/ReportService";
import { requireAuth, AuthenticatedSession } from "@/utils/middleware";
import { rbac } from "@/utils/rbac";

/**
 * @swagger
 * /api/reports:
 *   get:
 *     summary: Retrieve aggregate reports
 *     description: Returns aggregated balance, income, expenses, and weekly summary. Requires ADMIN role.
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: A report summary object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentBalance:
 *                   type: number
 *                   example: 125430
 *                 incomeThisMonth:
 *                   type: number
 *                   example: 45200
 *                 expensesThisMonth:
 *                   type: number
 *                   example: 12850
 *                 movementsSummary:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       day:
 *                         type: string
 *                         example: Lun
 *                       amount:
 *                         type: number
 *                         example: 22000
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

  if (req.method === "GET") {
    try {
      const summary = await ReportService.getReportSummary();
      return res.status(200).json(summary);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch report summary" });
    }
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default requireAuth(handler);
