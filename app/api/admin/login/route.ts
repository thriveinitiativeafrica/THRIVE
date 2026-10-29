import { NextRequest, NextResponse } from "next/server";
import { signToken } from "@/lib/auth";

// Rate limiting map: ip -> { count: number, resetAt: number }
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = loginAttempts.get(ip);
  if (!record) return false;
  if (now > record.resetAt) {
    loginAttempts.delete(ip);
    return false;
  }
  return record.count >= 5;
}

function recordAttempt(ip: string, success: boolean) {
  const now = Date.now();
  if (success) {
    loginAttempts.delete(ip);
    return;
  }
  const record = loginAttempts.get(ip) || { count: 0, resetAt: now + 15 * 60 * 1000 };
  record.count += 1;
  loginAttempts.set(ip, record);
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "local";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again in 15 minutes." },
      { status: 429 }
    );
  }

  try {
    const { password } = await req.json();
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    const sessionSecret = process.env.SESSION_SECRET || "thrive_secure_session_secret_2026";

    if (!password || password !== adminPassword) {
      recordAttempt(ip, false);
      return NextResponse.json({ error: "Invalid admin password." }, { status: 401 });
    }

    recordAttempt(ip, true);

    const sessionPayload = `admin:${Date.now()}`;
    const sessionToken = signToken(sessionPayload, sessionSecret);

    const response = NextResponse.json({ success: true, message: "Logged in successfully." });
    response.cookies.set("thrive_admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Login route error:", err);
    return NextResponse.json({ error: "Authentication failed." }, { status: 500 });
  }
}
