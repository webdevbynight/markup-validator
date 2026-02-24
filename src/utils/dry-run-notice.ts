import { WORKSPACE_NAME } from "../constants.js";

/**
 * Prints a notice that the validation is skipped in dry-run mode.
 */
export const dryRunNotice = (): void => {
  console.info(`[${WORKSPACE_NAME}]`, "Dry-run mode: validation skipped.");
};
