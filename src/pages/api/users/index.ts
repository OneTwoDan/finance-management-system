import { NextApiRequest, NextApiResponse } from "next";
import { UserService } from "@/services/UserService";
import { withAuth } from "@/utils/middleware";
import { Role } from "@prisma/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

export default withAuth(handler, [Role.ADMIN]);
