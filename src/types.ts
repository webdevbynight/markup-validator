export type Language = "html" | "css" | "svg";
export type IgnoreLevel = "info" | "warning" | null;
export type MarkupValidatorOptions = {
  files?: string[];
  paths?: string[];
  exclude?: string[];
  languages?: Language[];
  dryRun?: boolean;
  ignoreLevel?: IgnoreLevel;
};
interface MessageCommonProperties {
  message?: string;
  extract?: string;
  offset?: number;
  url?: string;
  firstLine?: number;
  firstColumn?: number;
  lastLine?: number;
  lastColumn?: number;
  hiliteStart?: number;
  hiliteLength?: number;
}
interface InfoMessage extends MessageCommonProperties {
  type: "info";
  subType?: "warning";
}
interface ErrorMessage extends MessageCommonProperties {
  type: "error";
  subType?: "fatal";
}
interface NonDocumentErrorMessage extends MessageCommonProperties {
  type: "non-document-error";
  subType?: "io" | "schema" | "internal";
}
export type Message = InfoMessage | ErrorMessage | NonDocumentErrorMessage;
export type ValidationResult = {
  version: string;
  messages: Message[];
  url?: string;
  source?: {
    code: string;
    type?: string;
    encoding?: string;
  };
  language?: string;
};
interface ValidationReportMessageCommonProperties {
  message: string;
}
interface InfoValidationReportMessage extends ValidationReportMessageCommonProperties {
  type: "info";
}
interface NonDocumentErrorValidationReportMessage extends ValidationReportMessageCommonProperties {
  type: "non-document-error";
}
interface WarningOrErrorValidationReportMessage extends ValidationReportMessageCommonProperties {
  type: "warning" | "error";
  line: number;
  column: number;
  extract: string;
}
export type ValidationReportMessage =
  | InfoValidationReportMessage
  | NonDocumentErrorValidationReportMessage
  | WarningOrErrorValidationReportMessage;
interface ValidationReportCommonProperties {
  language: Language;
  url: string;
}
interface ValidationReportFail extends ValidationReportCommonProperties {
  status: "fail";
  messages: ValidationReportMessage[];
}
interface ValidationReportPass extends ValidationReportCommonProperties {
  status: "pass";
  messages?: ValidationReportMessage[];
}
export type ValidationReport = ValidationReportFail | ValidationReportPass;
