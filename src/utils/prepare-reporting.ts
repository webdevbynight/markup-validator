import type { Language, ValidationReport, ValidationResult } from "../types.js";

import { cwd } from "node:process";

import { mapMessages } from "./map-messages.js";

/**
 * Prepares the reporting for the given file.
 * @param file - The file for which to prepare the reporting.
 * @param language - The language of the file.
 * @param result - The result of the validation.
 * @return The prepared reporting.
 */
export const prepareReporting = (
  file: string,
  language: Language,
  result: ValidationResult
): ValidationReport => {
  const { messages } = result;
  const reporting = {
    language,
    url: file.replace(`${cwd()}/`, "")
  };
  if (messages.length) {
    const hasErrorMessages = messages.some(message => message.type.includes("error"));
    if (hasErrorMessages) {
      return {
        ...reporting,
        status: "fail",
        messages: mapMessages(messages)
      };
    }
    return {
      ...reporting,
      status: "pass",
      messages: mapMessages(messages)
    };
  }
  return {
    ...reporting,
    status: "pass"
  };
};
