import type { Language, MarkupValidatorOptions } from "../../src/types.js";

export const mockedValidationOptions: {
  options: MarkupValidatorOptions;
  expectedLanguages: Language[];
}[] = [
  { options: {}, expectedLanguages: ["html", "css", "svg"] },
  { options: { languages: ["html"] }, expectedLanguages: ["html"] },
  { options: { languages: ["css"] }, expectedLanguages: ["css"] },
  {
    options: {
      paths: ["**/*.html"]
    },
    expectedLanguages: ["html"]
  },
  {
    options: {
      paths: ["**/*.html"],
      ignoreLevel: "info"
    },
    expectedLanguages: ["html"]
  },
  {
    options: {
      paths: ["**/*.html"],
      ignoreLevel: "warning"
    },
    expectedLanguages: ["html"]
  }
];
