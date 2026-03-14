import { NextApiRequest, NextApiResponse } from "next";
import { UserService } from "@/services/UserService";
import { requireAuth, AuthenticatedSession } from "@/utils/middleware";
import { rbac } from "@/utils/rbac";

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve all users
 *     description: Returns a list of all users in the system. Requires ADMIN role.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: uid123
 *                   name:
 *                     type: string
 *                     example: Admin User
 *                   email:
 *                     type: string
 *                     example: admin@sgf.com
 *                   role:
 *                     type: string
 *                     example: ADMIN
 *                   createdAt:
 *                     type: string
 *                     example: 2023-01-01T00:00:00Z
 *       403:
 *         description: Forbidden.
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
