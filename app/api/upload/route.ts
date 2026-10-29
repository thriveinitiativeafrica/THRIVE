import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { verifyToken } from "@/lib/auth";

// Image upload for the blog admin.
// Automatically compresses images into high-quality WebP (up to 1600px) so 1 GB of free
// Supabase Storage holds ~8,000–10,000 images instead of ~250 raw camera photos.

function safeName(name: string) {
  const base = name.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9.-]/g, "_");
  return `${Date.now()}-${base}.webp`;
}

async function uploadToSupabase(
  supabaseUrl: string,
  supabaseKey: string,
  bucket: string,
  objectPath: string,
  contentType: string,
  buffer: Buffer
) {
  const uploadUrl = `${supabaseUrl}/storage/v1/object/${bucket}/${objectPath}`;
  let res = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${supabaseKey}`,
      apikey: supabaseKey,
      "Content-Type": contentType,
      "x-upsert": "true",
    },
    body: new Uint8Array(buffer),
  });

  if (!res.ok) {
    await fetch(`${supabaseUrl}/storage/v1/bucket`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${supabaseKey}`,
        apikey: supabaseKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: bucket, name: bucket, public: true }),
    }).catch(() => {});

    res = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${supabaseKey}`,
        apikey: supabaseKey,
        "Content-Type": contentType,
        "x-upsert": "true",
      },
      body: new Uint8Array(buffer),
    });
  }

  return res;
}

export async function POST(req: NextRequest) {
  const sessionToken = req.cookies.get("thrive_admin_session")?.value;
  const sessionSecret = process.env.SESSION_SECRET || "thrive_secure_session_secret_2026";
  if (!sessionToken || !verifyToken(sessionToken, sessionSecret)) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const alt = (formData.get("alt") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
    }

    const rawBuffer = Buffer.from(await file.arrayBuffer());
    let uploadBuffer: Buffer = rawBuffer;
    let mimeType = file.type;
    let fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    try {
      uploadBuffer = await sharp(rawBuffer)
        .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
        .webp({ quality: 86 })
        .toBuffer();
      mimeType = "image/webp";
      fileName = safeName(file.name);
    } catch {
      // fallback to rawBuffer if sharp cannot process
    }

    // 1. Supabase Storage
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (supabaseUrl && supabaseKey) {
      const bucket = process.env.SUPABASE_STORAGE_BUCKET || "blog-images";
      const objectPath = `posts/${fileName}`;
      const res = await uploadToSupabase(
        supabaseUrl,
        supabaseKey,
        bucket,
        objectPath,
        mimeType,
        uploadBuffer
      );
      if (res.ok) {
        return NextResponse.json({
          url: `${supabaseUrl}/storage/v1/object/public/${bucket}/${objectPath}`,
          alt: alt || file.name.replace(/\.[^.]+$/, ""),
        });
      }
      console.error("Supabase upload failed, falling back:", await res.text());
    }

    // 2. Cloudinary
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (cloudName && apiKey && apiSecret) {
      const timestamp = Math.round(Date.now() / 1000);
      const signature = crypto
        .createHash("sha1")
        .update(`timestamp=${timestamp}${apiSecret}`)
        .digest("hex");

      const uploadFormData = new FormData();
      uploadFormData.append("file", new Blob([ new Uint8Array(uploadBuffer) ], { type: mimeType }), fileName);
      uploadFormData.append("api_key", apiKey);
      uploadFormData.append("timestamp", timestamp.toString());
      uploadFormData.append("signature", signature);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: uploadFormData,
      });
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json({ url: data.secure_url, alt: alt || file.name });
      }
      console.error("Cloudinary upload failed, falling back:", await res.text());
    }

    // 3. Fallback: Inline data URL on Vercel or local disk in dev
    if (process.env.VERCEL) {
      const dataUrl = `data:${mimeType};base64,${uploadBuffer.toString("base64")}`;
      return NextResponse.json({ url: dataUrl, alt: alt || file.name });
    }

    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      fs.writeFileSync(path.join(uploadDir, fileName), uploadBuffer);
      return NextResponse.json({ url: `/uploads/${fileName}`, alt: alt || file.name });
    } catch {
      const dataUrl = `data:${mimeType};base64,${uploadBuffer.toString("base64")}`;
      return NextResponse.json({ url: dataUrl, alt: alt || file.name });
    }
  } catch (err: unknown) {
    console.error("Upload handler error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
