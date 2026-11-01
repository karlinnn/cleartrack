import type { Application } from "@/data/applications";

// In-memory store for quotes submitted while the server is running.
// Kept on globalThis so it survives hot reloads in development.
const g = globalThis as unknown as { __ctQuotes?: Application[] };
export const submittedApplications: Application[] = (g.__ctQuotes ??= []);

export function addApplication(app: Application) {
  submittedApplications.unshift(app);
  if (submittedApplications.length > 200) submittedApplications.pop();
}

export function addWorkingDays(from: Date, days: number): Date {
  const d = new Date(from);
  let left = days;
  while (left > 0) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) left--;
  }
  return d;
}