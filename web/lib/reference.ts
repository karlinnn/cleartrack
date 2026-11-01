export function makeReference(): string {
  const year = new Date().getFullYear();
  const digits = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  return `CT-${year}-${digits}`;
}
