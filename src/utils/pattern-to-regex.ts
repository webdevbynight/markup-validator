/**
 * Converts a pattern with globs to a regular expression.
 * @param pattern - The pattern to convert.
 * @return The regular expression corresponding to the pattern.
 */
export const patternToRegex = (pattern: string): RegExp => {
  const regex = pattern
    .replace(/\\/g, "\\\\")
    .replace(/\//g, "\\/")
    .replace(/\./g, "\\.")
    .replace(/\*{2}/g, ".*")
    .replace(/(?<!\.)\*/g, "[^/]*");
  return new RegExp(regex);
};
