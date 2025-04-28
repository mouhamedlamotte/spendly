import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, currency: string = "XOF") {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
  }).format(value);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}