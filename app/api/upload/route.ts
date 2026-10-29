import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const alt = formData.get("alt") as string || "";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // If Cloudinary keys are configured, perform server-side signed upload
    if (cloudName && apiKey && apiSecret) {
      const timestamp = Math.round(new Date().getTime() / 1000);
      const signaturePayload = `timestamp=${timestamp}${apiSecret}`;
      const signature = crypto.createHash("sha1").update(signaturePayload).digest("hex");

      const uploadFormData = new FormData();
      uploadFormData.append("file", new Blob([buffer], { type: file.type }), file.name);
      uploadFormData.append("api_key", apiKey);
      uploadFormData.append("timestamp", timestamp.toString());
      uploadFormData.append("signature", signature);

      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: uploadFormData,
        }
      );

      if (!cloudinaryRes.ok) {
        const errorText = await cloudinaryRes.text();
        console.error("Cloudinary upload failed:", errorText);
        return NextResponse.json({ error: "Cloudinary upload failed" }, { status: 502 });
      }

      const cloudinaryData = await cloudinaryRes.json();
      return NextResponse.json({
        url: cloudinaryData.secure_url,
        alt: alt || file.name,
      });
    }

    // Fallback: save to public/uploads or return base64 data URL
    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const filePath = path.join(uploadDir, safeName);
      fs.writeFileSync(filePath, buffer);
      return NextResponse.json({
        url: `/uploads/${safeName}`,
        alt: alt || file.name,
      });
    } catch {
      // Memory fallback for read-only filesystem environments
      const base64 = buffer.toString("base64");
      const dataUrl = `data:${file.type};base64,${base64}`;
      return NextResponse.json({
        url: dataUrl,
        alt: alt || file.name,
      });
    }
  } catch (err: unknown) {
    console.error("Upload handler error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
