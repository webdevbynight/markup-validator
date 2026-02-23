import type { MarkupValidatorOptions } from "../../src/types.js";

export const mockedOptions: MarkupValidatorOptions[] = [
  {},
  {
    paths: ["**/*.html"]
  },
  {
    paths: ["**/*.html"],
    dryRun: true
  },
  {
    paths: ["**/*.html"],
    dryRun: true,
    ignoreLevel: "info"
  },
  {
    paths: ["**/*.html"],
    dryRun: true,
    ignoreLevel: "warning"
  },
  {
    paths: ["**/*.html"],
    ignoreLevel: "info"
  },
  {
    paths: ["**/*.html"],
    ignoreLevel: "warning"
  },
  {
    dryRun: true
  },
  {
    dryRun: true,
    ignoreLevel: "info"
  },
  {
    dryRun: true,
    ignoreLevel: "warning"
  },
  {
    ignoreLevel: "info"
  },
  {
    ignoreLevel: "warning"
  }
];
