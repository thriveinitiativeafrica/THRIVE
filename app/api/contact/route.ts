import { NextResponse } from "next/server";
import { saveContactMessage, getContactMessages } from "@/db";

export async function GET() {
  try {
    const messages = await getContactMessages();
    return NextResponse.json({ success: true, count: messages.length, data: messages });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch messages";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message, category } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const contact = await saveContactMessage({
      name,
      email,
      subject: subject || "General Inquiry",
      message,
      category: category || "General",
    });

    return NextResponse.json({ success: true, data: contact });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to submit contact message";
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
