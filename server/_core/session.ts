import { SignJWT, jwtVerify } from "jose";
import { COOKIE_NAME } from "@shared/const";
import type { Request } from "express";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "default-secret-change-me-in-prod-please-1234567890"
);

export async function createSessionToken(openId: string, userData: { name: string; expiresInMs: number }) {
    return await new SignJWT({ openId, name: userData.name })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(Date.now() + userData.expiresInMs)
        .sign(JWT_SECRET);
}

export async function verifySessionToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as { openId: string; name: string };
    } catch (error) {
        return null;
    }
}

export function getSessionTokenFromRequest(req: Request): string | null {
    // Check cookies (if parsed by cookie-parser)
    if (req.cookies && req.cookies[COOKIE_NAME]) {
        return req.cookies[COOKIE_NAME];
    }

    // Check raw cookie header if cookie-parser is not used or failed
    if (req.headers.cookie) {
        const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split('=');
            acc[key] = value;
            return acc;
        }, {} as Record<string, string>);

        if (cookies[COOKIE_NAME]) {
            return cookies[COOKIE_NAME];
        }
    }

    // Check Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        return authHeader.substring(7);
    }

    return null;
}
