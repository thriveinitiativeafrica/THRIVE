import { NextResponse } from "next/server";
import { saveNewsletterSubscriber } from "@/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ success: false, error: "Valid email is required" }, { status: 400 });
    }

    const sub = await saveNewsletterSubscriber(email);
    return NextResponse.json({ success: true, data: sub });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to subscribe to newsletter";
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
