import { AVAILABLE_CLI_FLAGS, TAB } from "../constants.js";

/**
 * Displays the CLI flags when running the CLI with the `--help` or `-h` flags.
 * @return The CLI flags, with their alias (if available), flag, description and type.
 */
export const displayCliFlags = (): string => {
  const availableCliFlagsValues = Object.values(AVAILABLE_CLI_FLAGS);
  const aliasMaxLength = Math.max(
    ...availableCliFlagsValues.map(cliFlag =>
      "alias" in cliFlag && cliFlag.alias ? cliFlag.alias.length : 0
    )
  );
  const flagMaxLength = Math.max(...availableCliFlagsValues.map(option => option.flag.length));
  const descriptionMaxLength = Math.max(
    ...availableCliFlagsValues.map(cliOption => cliOption.description.length)
  );
  const typeMaxLength = Math.max(...availableCliFlagsValues.map(option => option.type.length)) + 2;
  const header = "Options";
  const cliOptions: string[] = [];
  for (const cliFlag of availableCliFlagsValues) {
    const alias = "alias" in cliFlag ? `${cliFlag.alias}, ` : " ".repeat(aliasMaxLength + 2);
    const cliOptionName = `${TAB}${alias}${cliFlag.flag.padEnd(flagMaxLength, " ")}`;
    const description = `${cliFlag.description.padEnd(descriptionMaxLength, " ")}`;
    const type = `[${cliFlag.type}]`.padStart(typeMaxLength, " ");
    const cliOptionElements = [cliOptionName, description, type];
    cliOptions.push(cliOptionElements.join(TAB));
  }
  return `${header}\n${cliOptions.join("\n")}`;
};
