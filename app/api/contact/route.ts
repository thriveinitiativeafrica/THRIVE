import { NextRequest, NextResponse } from "next/server";
import { saveContactMessage } from "@/db";
import { verifyCaptcha } from "@/lib/captcha";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message, captchaAnswer, captchaToken } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Verify Math CAPTCHA
    if (!verifyCaptcha(captchaAnswer, captchaToken)) {
      return NextResponse.json(
        { error: "Incorrect security math answer. Please solve the simple math problem to prove you are human." },
        { status: 400 }
      );
    }

    await saveContactMessage(name, email, message, subject || null);
    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out. We have received your inquiry and will respond promptly.",
    });
  } catch (err: unknown) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Failed to submit contact message." }, { status: 500 });
  }
}
