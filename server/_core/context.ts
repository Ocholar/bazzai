import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import * as db from "../db";
import { getSessionTokenFromRequest, verifySessionToken } from "./session";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  try {
    const token = getSessionTokenFromRequest(opts.req);
    if (token) {
      const payload = await verifySessionToken(token);
      if (payload && payload.openId) {
        // getUserByOpenId returns User | undefined, we need User | null
        const dbUser = await db.getUserByOpenId(payload.openId);
        user = dbUser || null;
      }
    }
  } catch (error) {
    // Authentication is optional for public procedures.
    user = null;
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
