import { NextApiRequest, NextApiResponse } from "next";
import { ReportService } from "@/services/ReportService";
import { withAuth } from "@/utils/middleware";
import { Role } from "@prisma/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const summary = await ReportService.getReportSummary();
      return res.status(200).json(summary);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch report summary" });
    }
  }

  // Handle any other HTTP method
  res.setHeader("Allow", ["GET"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default withAuth(handler, [Role.ADMIN]);
