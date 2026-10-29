import { NextRequest, NextResponse } from "next/server";
import { saveNewsletterSubscriber } from "@/db";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    await saveNewsletterSubscriber(email);
    return NextResponse.json({ success: true, message: "Thank you for subscribing to updates from THRIVE." });
  } catch (err: unknown) {
    console.error("Newsletter API error:", err);
    return NextResponse.json({ error: "Failed to subscribe." }, { status: 500 });
  }
}
