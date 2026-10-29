import { NextRequest, NextResponse } from "next/server";
import { saveContactMessage } from "@/db";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    await saveContactMessage(name, email, message);
    return NextResponse.json({ success: true, message: "Thank you for reaching out. We will respond promptly." });
  } catch (err: unknown) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Failed to submit contact message." }, { status: 500 });
  }
}
