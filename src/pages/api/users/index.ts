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
 *         description: Forbidden. Insufficient permissions.
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user in the system. Requires ADMIN role.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               role:
 *                 type: string
 *                 example: USER
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Bad request. Missing required fields or email already in use.
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

  if (req.method === "POST") {
    try {
      const { name, email, phone, role } = req.body;
      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
      }
      const user = await UserService.createUser({ name, email, phone, role });
      if (!user) {
        return res.status(400).json({ error: "Failed to create user (maybe email already in use)" });
      }
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create user" });
    }
  }

  // Handle any other HTTP method
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default requireAuth(handler);
