import { NextResponse } from "next/server";
import { saveVolunteerSignup, getVolunteerSignups } from "@/db";

export async function GET() {
  try {
    const signups = await getVolunteerSignups();
    return NextResponse.json({ success: true, count: signups.length, data: signups });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch signups";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, location, availability, areaOfInterest, skills } = body;

    if (!name || !email) {
      return NextResponse.json({ success: false, error: "Name and email are required" }, { status: 400 });
    }

    const signup = await saveVolunteerSignup({
      name,
      email,
      phone,
      location,
      availability,
      areaOfInterest,
      skills,
    });

    return NextResponse.json({ success: true, data: signup });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to submit volunteer signup";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
