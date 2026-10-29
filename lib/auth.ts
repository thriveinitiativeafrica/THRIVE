import crypto from "crypto";

export function signToken(data: string, secret: string): string {
  const signature = crypto.createHmac("sha256", secret).update(data).digest("hex");
  return `${data}.${signature}`;
}

export function verifyToken(token: string, secret: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [data, signature] = parts;
  const expectedSignature = crypto.createHmac("sha256", secret).update(data).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
}
