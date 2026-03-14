import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/lib/auth";

export type AuthenticatedSession = typeof auth.$Infer.Session;

type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: AuthenticatedSession
) => Promise<void | NextApiResponse> | void | NextApiResponse;

export function requireAuth(handler: ApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await auth.api.getSession({
      headers: req.headers as Record<string, string>,
    });

    if (!session || !session.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    return handler(req, res, session as AuthenticatedSession);
  };
}
