import type { ValidationReport } from "../types.js";

import { WORKSPACE_NAME } from "../constants.js";

/**
 * Displays the reporting in the console.
 * @param reporting - The reporting to display.
 * @param timestamp - The timestamp of the reporting.
 */
export const displayReporting = (reporting: ValidationReport, timestamp: number): void => {
  const { language, status, url, messages } = reporting;
  const statusIcon = status === "pass" ? "\u2714" : "\u2718";
  const statusColour = status === "pass" ? 32 : 31;
  const dateTime = Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "UTC"
  }).format(timestamp);
  console.group(`[${dateTime}]`, `[${WORKSPACE_NAME}]`, `[${language.toUpperCase()}]`, url);
  if (status === "fail") {
    console.info(
      `\x1b[1;${statusColour}m${statusIcon} ${status}\x1b[0m`,
      `(messages: ${reporting.messages.length})`
    );
  } else {
    console.info(`\x1b[1;${statusColour}m${statusIcon} ${status}\x1b[0m`);
  }
  if (messages) {
    for (const reportingMessage of messages) {
      const { type, message } = reportingMessage;
      if (type === "error" || type === "warning") {
        const { extract, line, column } = reportingMessage;
        if (type === "error") console.error("\x1b[1;31mError:\x1b[0m", message);
        else console.warn("\x1b[1;33mWarning:\x1b[0m", message);
        if (extract) console.info(`line ${line}, column ${column}:`, extract);
      } else if (type === "non-document-error") {
        console.error("\x1b[1;31mNon-document error:\x1b[0m", message);
      } else console.info("\x1b[1;34mInfo:\x1b[0m", message);
    }
  }
  console.groupEnd();
};
