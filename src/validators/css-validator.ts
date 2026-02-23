import type { IgnoreLevel, ValidationResult } from "../types.js";

import { postDocumentUsingRest } from "../utils/post-document-using-rest.js";

import { W3C_MAIN_VALIDATOR_ENTRY_POINT } from "../constants.js";

/**
 * Validates CSS content using the W3C HTML Validator.
 */
export class CSSValidator {
  private readonly content: string;
  private readonly ignoreLevel: IgnoreLevel;

  /**
   * Constructs an instance of the class with the specified content and ignore level.
   *
   * @param content - The CSS content to validate.
   * @param [ignoreLevel] - The ignore level to use.
   */
  constructor(content: string, ignoreLevel: IgnoreLevel = null) {
    this.content = content;
    this.ignoreLevel = ignoreLevel;
  }

  /**
   * Validates the CSS content.
   * @return The validation result.
   */
  async validate(): Promise<ValidationResult> {
    const params = new URLSearchParams();
    params.append("out", "json");
    params.append("css", "yes");
    if (this.ignoreLevel) {
      params.append("level", this.ignoreLevel === "info" ? "warning" : "error");
    }
    return await postDocumentUsingRest(
      `${W3C_MAIN_VALIDATOR_ENTRY_POINT}?${params}`,
      this.content,
      {
        "Content-Type": "text/css; charset=utf-8"
      }
    );
  }
}
