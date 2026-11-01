export type QuoteData = Record<string, unknown>;
export type Errors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s\-().]{7,20}$/;

export function validateQuote(data: QuoteData): Errors {
  const errors: Errors = {};

  if (!data.service || typeof data.service !== "string" || !data.service.trim()) {
    errors.service = "Please select a service.";
  }

  if (!data.category || typeof data.category !== "string" || !data.category.trim()) {
    errors.category = "Please select a document category.";
  }

  if (!data.country || typeof data.country !== "string" || !data.country.trim()) {
    errors.country = "Please select a country.";
  }

  if (!data.purpose || typeof data.purpose !== "string" || !data.purpose.trim()) {
    errors.purpose = "Please describe the purpose.";
  }

  const count = Number(data.count);
  if (!data.count && data.count !== 0) {
    errors.count = "Please enter the number of documents.";
  } else if (!Number.isInteger(count) || count < 1 || count > 50) {
    errors.count = "Document count must be between 1 and 50.";
  }

  if (data.urgency !== "standard" && data.urgency !== "urgent") {
    errors.urgency = "Please select standard or urgent processing.";
  }

  if (!data.name || typeof data.name !== "string" || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!data.email || typeof data.email !== "string" || !EMAIL_RE.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (data.phone !== undefined && data.phone !== null && data.phone !== "") {
    if (typeof data.phone !== "string" || !PHONE_RE.test(data.phone.trim())) {
      errors.phone = "Please enter a valid phone number.";
    }
  }

  return errors;
}

export function validateStep(step: number, data: QuoteData): Errors {
  const errors: Errors = {};

  if (step === 1) {
    if (!data.service || typeof data.service !== "string" || !data.service.trim()) {
      errors.service = "Please select a service.";
    }
    if (!data.category || typeof data.category !== "string" || !data.category.trim()) {
      errors.category = "Please select a document category.";
    }
    if (!data.country || typeof data.country !== "string" || !data.country.trim()) {
      errors.country = "Please select a country.";
    }
    if (!data.purpose || typeof data.purpose !== "string" || !data.purpose.trim()) {
      errors.purpose = "Please describe the purpose.";
    }
  }

  if (step === 2) {
    const count = Number(data.count);
    if (!data.count && data.count !== 0) {
      errors.count = "Please enter the number of documents.";
    } else if (!Number.isInteger(count) || count < 1 || count > 50) {
      errors.count = "Document count must be between 1 and 50.";
    }
    if (data.urgency !== "standard" && data.urgency !== "urgent") {
      errors.urgency = "Please select standard or urgent processing.";
    }
  }

  if (step === 3) {
    if (!data.name || typeof data.name !== "string" || data.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters.";
    }
    if (!data.email || typeof data.email !== "string" || !EMAIL_RE.test(data.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (data.phone !== undefined && data.phone !== null && data.phone !== "") {
      if (typeof data.phone !== "string" || !PHONE_RE.test(data.phone.trim())) {
        errors.phone = "Please enter a valid phone number.";
      }
    }
  }

  return errors;
}
