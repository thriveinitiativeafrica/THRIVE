import { NextRequest, NextResponse } from "next/server";
import { getAllContactMessages, deleteContactMessage } from "@/db";
import { verifyToken } from "@/lib/auth";

function isAdmin(req: NextRequest) {
  const token = req.cookies.get("thrive_admin_session")?.value;
  const secret = process.env.SESSION_SECRET || "thrive_secure_session_secret_2026";
  return Boolean(token && verifyToken(token, secret));
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  try {
    const messages = await getAllContactMessages();
    return NextResponse.json({ messages });
  } catch (err: unknown) {
    console.error("Get contact messages error:", err);
    return NextResponse.json({ error: "Failed to fetch contact messages." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const idStr = searchParams.get("id");
    if (!idStr) {
      return NextResponse.json({ error: "Message ID is required." }, { status: 400 });
    }
    const id = parseInt(idStr, 10);
    await deleteContactMessage(id);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Delete contact message error:", err);
    return NextResponse.json({ error: "Failed to delete contact message." }, { status: 500 });
  }
}
