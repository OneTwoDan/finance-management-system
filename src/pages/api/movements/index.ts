import { NextApiRequest, NextApiResponse } from "next";
import { MovementService } from "@/services/MovementService";
import { withAuth, AuthenticatedSession } from "@/utils/middleware";
import { rbac } from "@/utils/rbac";
import { Role } from "@prisma/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  session: AuthenticatedSession
) {
  if (req.method === "GET") {
    try {
      // NOTE: MovementService might need to be adjusted to filter by user
      const movements = await MovementService.getMovements();
      return res.status(200).json(movements);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch movements" });
    }
  }

  if (req.method === "POST") {
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

export default withAuth(handler, [Role.ADMIN, Role.USER]);
