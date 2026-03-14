import { NextApiRequest, NextApiResponse } from "next";
import { UserService } from "@/services/UserService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "PATCH") {
    try {
      const userId = Number(id);
      if (isNaN(userId)) {
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
