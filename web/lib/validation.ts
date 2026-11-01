/** Pure field validators — no side-effects, no imports. */

export type QuoteStep1 = {
  service: string;
  documentCategory: string;
  destinationCountry: string;
  purpose: string;
};

export type QuoteStep2 = {
  documentCount: string;
  urgency: "standard" | "urgent" | "";
};

export type QuoteStep3 = {
  name: string;
  email: string;
  phone: string;
};

export type QuotePayload = QuoteStep1 & QuoteStep2 & QuoteStep3 & { company?: string };

export type FieldErrors = Record<string, string>;

export function validateStep1(v: QuoteStep1): FieldErrors {
  const e: FieldErrors = {};
  if (!v.service.trim()) e.service = "Please select a service.";
  if (!v.documentCategory.trim()) e.documentCategory = "Please select a document category.";
  if (!v.destinationCountry.trim()) e.destinationCountry = "Please enter the destination country.";
  if (!v.purpose.trim()) e.purpose = "Please describe the purpose.";
  return e;
}

export function validateStep2(v: QuoteStep2): FieldErrors {
  const e: FieldErrors = {};
  const n = parseInt(v.documentCount, 10);
  if (!v.documentCount.trim() || isNaN(n) || n < 1 || n > 999)
    e.documentCount = "Please enter a number between 1 and 999.";
  if (!v.urgency) e.urgency = "Please select standard or urgent.";
  return e;
}

export function validateStep3(v: QuoteStep3): FieldErrors {
  const e: FieldErrors = {};
  if (!v.name.trim() || v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!v.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
    e.email = "Please enter a valid email address.";
  if (v.phone.trim() && !/^[+\d\s()\-]{6,20}$/.test(v.phone.trim()))
    e.phone = "Phone number does not look right.";
  return e;
}

export function validateAll(v: QuotePayload): FieldErrors {
  return {
    ...validateStep1(v),
    ...validateStep2(v),
    ...validateStep3(v),
  };
}
