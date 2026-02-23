import type { Language, MarkupValidatorOptions, ValidationResult } from "./types.js";

import fs from "node:fs";
import path from "node:path";

import { displayReporting } from "./utils/display-reporting.js";
import { dryRunNotice } from "./utils/dry-run-notice.js";
import { getFilesToValidate } from "./utils/get-files-to-validate.js";
import { prepareReporting } from "./utils/prepare-reporting.js";
import { CSSValidator } from "./validators/css-validator.js";
import { HTMLValidator } from "./validators/html-validator.js";
import { SVGValidator } from "./validators/svg-validator.js";

import { DELAY, EXTENSIONS_PER_LANGUAGE } from "./constants.js";

export class MarkupValidator {
  private readonly options: MarkupValidatorOptions = {};

  /**
   * Constructs an instance of the class with the specified options.
   *
   * @param [options] - The options to use.
   */
  constructor(options?: MarkupValidatorOptions) {
    this.options = options ?? {};
  }

  /**
   * Validates the markup files.
   */
  async validate(): Promise<void> {
    const { dryRun } = this.options;
    if (dryRun) dryRunNotice();
    else {
      const filesToValidate = await getFilesToValidate(this.options);
      filesToValidate.forEach((file, i) => {
        const content = fs.readFileSync(file, "utf-8");
        if (content) {
          const fileExtension = path.extname(file);
          const languages = Object.keys(EXTENSIONS_PER_LANGUAGE) as Language[];
          const language = languages.find(language =>
            EXTENSIONS_PER_LANGUAGE[language].includes(fileExtension)
          );
          globalThis.setTimeout(async () => {
            const { ignoreLevel } = this.options;
            let result: ValidationResult | null = null;
            switch (language) {
              case "html": {
                const validator = new HTMLValidator(content, ignoreLevel);
                result = await validator.validate();
                break;
              }
              case "css": {
                const validator = new CSSValidator(content, ignoreLevel);
                result = await validator.validate();
                break;
              }
              case "svg": {
                const validator = new SVGValidator(content, ignoreLevel);
                result = await validator.validate();
                break;
              }
              default:
                console.error(
                  `Failed to validate the file ${file}: language ${language} not supported.`
                );
                break;
            }
            if (language && result) {
              displayReporting(prepareReporting(file, language, result), Date.now());
            }
          }, i * DELAY);
        }
      });
    }
  }
}
