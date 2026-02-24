import type { Message, ValidationReportMessage } from "../types.js";

export const mapMessages = (messages: Message[]): ValidationReportMessage[] => {
  return messages.map(messageItem => {
    const { type, subType, message, extract, firstLine, lastLine, firstColumn, lastColumn } =
      messageItem;
    const reportMessage: ValidationReportMessage = {
      type: type === "info" && subType === "warning" ? "warning" : type,
      message: message ?? "",
      line: firstLine ?? lastLine ?? 0,
      column: firstColumn ?? lastColumn ?? 0,
      extract: extract?.replace(/\n/g, "\\n") ?? ""
    };
    if (reportMessage.type === "non-document-error" || reportMessage.type === "info") {
      Reflect.deleteProperty(reportMessage, "line");
      Reflect.deleteProperty(reportMessage, "column");
      Reflect.deleteProperty(reportMessage, "extract");
    }
    return reportMessage;
  });
};
