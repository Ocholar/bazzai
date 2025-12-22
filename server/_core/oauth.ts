import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { githubOAuth } from "./githubOAuth";
import { createSessionToken } from "./session";

function getQueryParam(req: Request, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}

export function registerOAuthRoutes(app: Express) {
  app.get("/api/oauth/callback", async (req: Request, res: Response) => {
    const code = getQueryParam(req, "code");

    if (!code) {
      res.status(400).json({ error: "code is required" });
      return;
    }

    try {
      console.log("[OAuth] Starting GitHub OAuth callback");
      console.log("[OAuth] Code received:", code ? "yes" : "no");

      // Exchange code for access token
      console.log("[OAuth] Exchanging code for token...");
      const accessToken = await githubOAuth.exchangeCodeForToken(code);
      console.log("[OAuth] Access token received");

      // Get user info from GitHub
      console.log("[OAuth] Fetching user info...");
      const userInfo = await githubOAuth.getUserInfo(accessToken);
      console.log("[OAuth] User info received:", { openId: userInfo.openId, name: userInfo.name });

      if (!userInfo.openId) {
        console.error("[OAuth] Missing openId");
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }

      // Upsert user in database
      console.log("[OAuth] Upserting user in database...");
      await db.upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: "github",
        lastSignedIn: new Date(),
      });
      console.log("[OAuth] User upserted successfully");

      // Create session token using custom session service
      console.log("[OAuth] Creating session token...");
      const sessionToken = await createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS,
      });
      console.log("[OAuth] Session token created");

      // Set session cookie
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      console.log("[OAuth] Cookie set");

      // Redirect to dashboard (using hash routing for GitHub Pages)
      console.log("[OAuth] Redirecting to dashboard");
      res.redirect(302, "https://bazztech.co.ke/#/dashboard");
    } catch (error) {
      console.error("[OAuth] GitHub callback failed:", error);
      console.error("[OAuth] Error stack:", error instanceof Error ? error.stack : "No stack trace");
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}
