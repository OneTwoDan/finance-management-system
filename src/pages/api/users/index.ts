import { NextApiRequest, NextApiResponse } from "next";
import { UserService } from "@/services/UserService";
import { requireAuth, AuthenticatedSession } from "@/utils/middleware";
import { rbac } from "@/utils/rbac";

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
      const users = await UserService.getUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch users" });
    }
  }

  // Handle any other HTTP method
  res.setHeader("Allow", ["GET"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default requireAuth(handler);
