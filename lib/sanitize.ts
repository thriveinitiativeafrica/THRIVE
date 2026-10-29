export function sanitizeHtml(rawHtml: string): string {
  if (!rawHtml) return "";

  // Strip script, style, iframe, object, embed tags completely along with their contents
  let cleaned = rawHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  cleaned = cleaned.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");
  cleaned = cleaned.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "");
  cleaned = cleaned.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "");
  cleaned = cleaned.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, "");

  // Strip dangerous inline attributes like on* (onload, onerror, onclick, etc.)
  cleaned = cleaned.replace(/\s+on[a-z]+="[^"]*"/gi, "");
  cleaned = cleaned.replace(/\s+on[a-z]+='[^']*'/gi, "");
  cleaned = cleaned.replace(/\s+on[a-z]+=[^\s>]+/gi, "");

  // Strip javascript: URIs
  cleaned = cleaned.replace(/href=["']?javascript:[^"'>]+["']?/gi, 'href="#"');
  cleaned = cleaned.replace(/src=["']?javascript:[^"'>]+["']?/gi, 'src=""');

  return cleaned;
}
