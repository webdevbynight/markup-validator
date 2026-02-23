import type { Language } from "./types.js";

import packageManifest from "../package.json" with { type: "json" };

export const WORKSPACE_NAME = "markup-validator";
export const DELAY = 500;
export const W3C_MAIN_VALIDATOR_ENTRY_POINT = "https://validator.w3.org/nu/";
export const USER_AGENT = `${WORKSPACE_NAME}/${packageManifest.version} (${packageManifest.homepage})`;
export const EXTENSIONS_PER_LANGUAGE: Record<Language, string[]> = {
  html: [".html", ".htm"],
  css: [".css"],
  svg: [".svg"]
};
