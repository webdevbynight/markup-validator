export const regexPatterns = [
  {
    pattern: "docs",
    regex: /docs/
  },
  {
    pattern: "docs/*",
    regex: /docs\/[^/]*/
  },
  {
    pattern: "docs/**",
    regex: /docs\/.*/
  },
  {
    pattern: "**/docs/**",
    regex: /.*\/docs\/.*/
  },
  {
    pattern: "docs/*.html",
    regex: /docs\/[^/]*\.html/
  },
  {
    pattern: "docs/**/*.html",
    regex: /docs\/.*\/[^/]*\.html/
  },
  {
    pattern: "**/docs/**/*.html",
    regex: /.*\/docs\/.*\/[^/]*\.html/
  }
];
