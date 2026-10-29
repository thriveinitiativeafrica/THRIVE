import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get("thrive_admin_session")?.value;
  const sessionSecret = process.env.SESSION_SECRET || "thrive_secure_session_secret_2026";

  if (!sessionToken || !verifyToken(sessionToken, sessionSecret)) {
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({ authenticated: true });
}

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out." });
  response.cookies.delete("thrive_admin_session");
  return response;
}
