import type { MarkupValidatorOptions } from "../../../src/types.js";

export const mockedArgs: { args: string[]; expected: MarkupValidatorOptions }[] = [
  {
    args: [],
    expected: {}
  },
  {
    args: ["--files", "docs/index.html", "docs/styles.css", "docs/icon.svg", "docs/formula.mml"],
    expected: { files: ["docs/index.html", "docs/styles.css", "docs/icon.svg", "docs/formula.mml"] }
  },
  {
    args: ["-f", "docs/index.html", "docs/styles.css", "docs/icon.svg", "docs/formula.mml"],
    expected: { files: ["docs/index.html", "docs/styles.css", "docs/icon.svg", "docs/formula.mml"] }
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
    args: ["--languages", "html", "svg", "mathml"],
    expected: { languages: ["html", "svg", "mathml"] }
  },
  {
    args: ["-l", "html", "svg", "mathml"],
    expected: { languages: ["html", "svg", "mathml"] }
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
