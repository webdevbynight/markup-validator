import process from "node:process";

import { MarkupValidator } from "./markup-validator.js";
import { parseArgs } from "./utils/parse-args.js";
import { showHelp } from "./utils/show-help.js";
import { showVersion } from "./utils/show-version.js";

/**
 * Runs the validator via the CLI.
 */
export const cli = async (): Promise<void> => {
  const { argv } = process;
  const args = argv.slice(2);
  if (args.includes("--help") || args.includes("-h")) {
    showHelp();
  } else if (args.includes("--version") || args.includes("-v")) {
    showVersion();
  } else {
    const validator = new MarkupValidator(parseArgs(args));
    await validator.validate();
  }
};
