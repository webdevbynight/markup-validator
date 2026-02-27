import type { Language } from "./types.js";

import packageManifest from "../package.json" with { type: "json" };

export const TAB = " ".repeat(2);
export const WORKSPACE_NAME = "markup-validator";
export const AVAILABLE_CLI_FLAGS = {
  files: {
    cliFlagName: "files",
    flag: "--files",
    alias: "-f",
    description: "Files to validate",
    type: "array"
  },
  paths: {
    cliFlagName: "paths",
    flag: "--paths",
    alias: "-p",
    description: "Folders to include for validation",
    type: "array"
  },
  exclude: {
    cliFlagName: "exclude",
    flag: "--exclude",
    alias: "-e",
    description: "Paths to skip",
    type: "array"
  },
  languages: {
    cliFlagName: "languages",
    flag: "--languages",
    alias: "-l",
    description: "Languages to validate",
    type: "array"
  },
  dryRun: {
    cliFlagName: "dryRun",
    flag: "--dry-run",
    alias: "-d",
    description: "Bypass validation",
    type: "boolean"
  },
  ignoreLevel: {
    cliFlagName: "ignoreLevel",
    flag: "--ignore-level",
    alias: "-i",
    description: "Ignore this level and the lower ones",
    type: "string"
  },
  version: {
    cliFlagName: "version",
    flag: "--version",
    alias: "-v",
    description: "Show version number",
    type: "boolean"
  },
  help: {
    cliFlagName: "help",
    flag: "--help",
    alias: "-h",
    description: "Show help",
    type: "boolean"
  }
} as const;
export const DELAY = 500;
export const W3C_MAIN_VALIDATOR_ENTRY_POINT = "https://validator.w3.org/nu/";
export const USER_AGENT = `${WORKSPACE_NAME}/${packageManifest.version} (${packageManifest.homepage})`;
export const EXTENSIONS_PER_LANGUAGE: Record<Language, string[]> = {
  html: [".html", ".htm"],
  css: [".css"],
  svg: [".svg"]
};
