/**
 * cleanText(html)
 *
 * Strips HTML tags, decodes numeric (&#160;), hex (&#xA0;) and named
 * HTML entities, collapses whitespace, and trims the result.
 *
 * Named entities handled: nbsp, amp, lt, gt, quot, apos,
 * hellip, ndash, mdash, lsquo, rsquo, ldquo, rdquo.
 */

const NAMED: Record<string, string> = {
  nbsp:   " ",
  amp:    "&",
  lt:     "<",
  gt:     ">",
  quot:   '"',
  apos:   "'",
  hellip: "…",
  ndash:  "–",
  mdash:  "—",
  lsquo:  "\u2018",
  rsquo:  "\u2019",
  ldquo:  "\u201C",
  rdquo:  "\u201D",
};

export function cleanText(html: string): string {
  return html
    // 1. Strip all tags
    .replace(/<[^>]*>/g, "")
    // 2. Decode hex entities  &#xA0;
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16))
    )
    // 3. Decode decimal entities  &#160;
    .replace(/&#([0-9]+);/g, (_, dec) =>
      String.fromCodePoint(Number(dec))
    )
    // 4. Decode named entities
    .replace(/&([a-zA-Z]+);/g, (match, name) =>
      NAMED[name] ?? match
    )
    // 5. Collapse whitespace and trim
    .replace(/\s+/g, " ")
    .trim();
}
