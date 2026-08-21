import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: "NGN" | "USD" = "NGN"): string {
  if (currency === "NGN") {
    return `₦${amount.toLocaleString("en-NG")}`;
  }
  return `$${amount.toLocaleString("en-US")}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
