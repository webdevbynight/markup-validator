import type { IgnoreLevel, ValidationResult } from "../types.js";

import { postDocumentUsingRest } from "../utils/post-document-using-rest.js";

import { W3C_MAIN_VALIDATOR_ENTRY_POINT } from "../constants.js";

/**
 * Validates MathML content using the W3C MathML Validator.
 */
export class MathMLValidator {
  private readonly content: string;
  private readonly ignoreLevel: IgnoreLevel;

  /**
   * Constructs an instance of the class with the specified content and ignore level.
   *
   * @param content - The MathML content to validate.
   * @param [ignoreLevel] - The ignore level to use.
   */
  constructor(content: string, ignoreLevel: IgnoreLevel = null) {
    this.content = content;
    this.ignoreLevel = ignoreLevel;
  }

  /**
   * Validates the MathML content.
   * @return The validation result.
   */
  async validate(): Promise<ValidationResult> {
    const params = new URLSearchParams();
    params.append("out", "json");
    params.append("parser", "xmldtd");
    params.append("schema", "https://www.w3.org/Math/RelaxNG/mathml3/mathml3.rnc");
    if (this.ignoreLevel) {
      params.append("level", this.ignoreLevel === "info" ? "warning" : "error");
    }
    return await postDocumentUsingRest(
      `${W3C_MAIN_VALIDATOR_ENTRY_POINT}?${params}`,
      this.content,
      {
        "Content-Type": "application/mathml+xml"
      }
    );
  }
}
