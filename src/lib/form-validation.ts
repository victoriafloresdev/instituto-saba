export const FORM_LIMITS = {
  name: 120,
  email: 254,
  phone: 30,
  city: 100,
  subject: 160,
  role: 120,
  document: 32,
  school: 180,
  ageRange: 120,
  portfolio: 500,
  shortText: 255,
  message: 2000,
} as const;

export function formString(data: FormData, name: string): string {
  const value = data.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export function isValidEmail(value: string): boolean {
  return value.length <= FORM_LIMITS.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return value.length <= FORM_LIMITS.phone && digits.length >= 8 && digits.length <= 15;
}

export function isValidHttpUrl(value: string): boolean {
  if (!value) return true;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function isIntegerBetween(value: string, min: number, max: number): boolean {
  if (!/^\d+$/.test(value)) return false;
  const number = Number(value);
  return Number.isSafeInteger(number) && number >= min && number <= max;
}

export function isMoney(value: string, max = 1_000_000_000): boolean {
  if (!value) return true;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 && number <= max;
}

export function isWithinLength(value: string, max: number, min = 1): boolean {
  return value.length >= min && value.length <= max;
}
