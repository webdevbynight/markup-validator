import type { MarkupValidatorOptions } from "../../../src/types.js";

export const mockedArgs: { args: string[]; expected: MarkupValidatorOptions }[] = [
  {
    args: [],
    expected: {}
  },
  {
    args: ["--files", "docs/index.html", "docs/styles.css", "docs/icon.svg"],
    expected: { files: ["docs/index.html", "docs/styles.css", "docs/icon.svg"] }
  },
  {
    args: ["-f", "docs/index.html", "docs/styles.css", "docs/icon.svg"],
    expected: { files: ["docs/index.html", "docs/styles.css", "docs/icon.svg"] }
  },
  {
    args: ["--paths", "docs", "--exclude", "build", "tmp"],
    expected: { paths: ["docs"], exclude: ["build", "tmp"] }
  },
  {
    args: ["-p", "docs", "--exclude", "build", "tmp"],
    expected: { paths: ["docs"], exclude: ["build", "tmp"] }
  },
  {
    args: ["--languages", "html", "svg"],
    expected: { languages: ["html", "svg"] }
  },
  {
    args: ["-l", "html", "svg"],
    expected: { languages: ["html", "svg"] }
  },
  {
    args: ["--dry-run"],
    expected: { dryRun: true }
  },
  {
    args: ["-d"],
    expected: { dryRun: true }
  }
];
