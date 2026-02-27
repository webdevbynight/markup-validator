import { displayCliFlags } from "./display-cli-flags.js";

import { TAB, WORKSPACE_NAME } from "../constants.js";

/**
 * Displays the help content for the CLI.
 */
export const showHelp = (): void => {
  const intro = "Checks validity of HTML, CSS and SVG documents";
  const usage = `Usage:\n${TAB}${WORKSPACE_NAME} [flags]`;
  const cliFlags = displayCliFlags();
  const output = [intro, usage, cliFlags].join("\n".repeat(2));
  console.log(output);
};
