/**
 * Checks if a string contains HTML tags
 * @param text - The text to check
 * @returns True if HTML tags are present
 */
export function containsHtml(text: string): boolean {
  if (!text) return false;
  return /<[^>]+>/g.test(text);
}

