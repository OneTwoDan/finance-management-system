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

  const { id } = req.query;

  if (req.method === "PATCH") {
    try {
      const userId = String(id);
      if (!userId) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      await UserService.updateUser(userId, req.body);
      return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to update user" });
    }
  }

  // Handle any other HTTP method
  res.setHeader("Allow", ["PATCH"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default requireAuth(handler);
