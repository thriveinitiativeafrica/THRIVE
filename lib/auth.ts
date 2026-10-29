import crypto from "crypto";

export function signToken(data: string, secret: string): string {
  const signature = crypto.createHmac("sha256", secret).update(data).digest("hex");
  return `${data}.${signature}`;
}

export function verifyToken(token: string, secret: string): boolean {
  const idx = token.lastIndexOf(".");
  if (idx <= 0) return false;
  const data = token.slice(0, idx);
  const signature = token.slice(idx + 1);
  const expected = crypto.createHmac("sha256", secret).update(data).digest("hex");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
