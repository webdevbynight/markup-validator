import type { MarkupValidatorOptions } from "../types.js";

import { AVAILABLE_CLI_FLAGS } from "../constants.js";

/**
 * Parses the command-line arguments into an object of options.
 * @param args - The command-line arguments to parse.
 * @return An object of options.
 */
export const parseArgs = (args: string[]): MarkupValidatorOptions => {
  if (args.length) {
    const options: MarkupValidatorOptions = {};
    const flagMap = Object.entries(AVAILABLE_CLI_FLAGS)
      .filter(([key]) => key !== "version" && key !== "help")
      .reduce((map, [key, { flag, alias }]) => {
        if (flag) map.set(flag, key as keyof MarkupValidatorOptions);
        if (alias) map.set(alias, key as keyof MarkupValidatorOptions);
        return map;
      }, new Map<string, keyof MarkupValidatorOptions>());
    let currentKey: keyof MarkupValidatorOptions | null = null;
    for (const arg of args) {
      if (arg.startsWith("-")) {
        const isValidKey = flagMap.has(arg);
        if (isValidKey) {
          currentKey = flagMap.get(arg) ?? null;
          if (currentKey) {
            if (currentKey === "dryRun") options[currentKey] = true;
            else if (currentKey === "ignoreLevel") options[currentKey] = null;
            else options[currentKey] = [];
          }
        }
      } else {
        if (currentKey && currentKey in options) {
          if (currentKey === "languages") {
            const languages = options[currentKey] ?? [];
            switch (arg) {
              case "html":
                languages.push("html");
                break;
              case "css":
                languages.push("css");
                break;
              case "svg":
                languages.push("svg");
                break;
              default:
                break;
            }
            options[currentKey] = languages;
          } else if (currentKey === "ignoreLevel") {
            options[currentKey] = arg === "info" || arg === "warning" ? arg : null;
          } else if (currentKey !== "dryRun") {
            const values = options[currentKey] ?? [];
            values.push(arg);
            options[currentKey] = values;
          }
        }
      }
    }
    return options;
  }
  return {};
};
