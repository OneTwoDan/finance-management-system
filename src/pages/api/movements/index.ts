import { NextApiRequest, NextApiResponse } from "next";
import { MovementService } from "@/services/MovementService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const movements = await MovementService.getMovements();
      return res.status(200).json(movements);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch movements" });
    }
  }

  if (req.method === "POST") {
    try {
      const newMovement = await MovementService.createMovement(req.body);
      return res.status(201).json(newMovement);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create movement" });
    }
  }

  // Handle any other HTTP method
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
