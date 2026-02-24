import type { Language, MarkupValidatorOptions } from "../types.js";

import fs from "node:fs/promises";
import path from "node:path";
import { cwd } from "node:process";

import { browseFolders } from "./browse-folders.js";
import { patternToRegex } from "./pattern-to-regex.js";

import { EXTENSIONS_PER_LANGUAGE } from "../constants.js";

/**
 * Gets the files to validate from the specified options.
 *
 * The `files` option takes precedence over the other options.
 * @param [options] - The options to use.
 * @return An array of the files to validate.
 */
export const getFilesToValidate = async (
  options: MarkupValidatorOptions = {}
): Promise<string[]> => {
  const { files, paths, exclude, languages } = options;
  if (files) return files.map(file => path.resolve(cwd(), file));
  const excludeRegexps = [...(exclude ?? []), "node_modules"].map(patternToRegex);
  const folders = (await browseFolders(cwd())).map(async folder => {
    const isExcluded = excludeRegexps?.some(regex => regex.test(folder)) ?? false;
    if (isExcluded || (paths && !paths.some(path => folder.startsWith(`${cwd()}/${path}`)))) {
      return [];
    }
    const files = await fs.readdir(folder);
    const filesToValidate: string[] = [];
    const extensions = languages
      ? (Object.keys(EXTENSIONS_PER_LANGUAGE) as Language[])
          .filter(key => languages.includes(key))
          .flatMap(key => EXTENSIONS_PER_LANGUAGE[key])
      : Object.values(EXTENSIONS_PER_LANGUAGE).flat();
    for (const file of files) {
      const fileStat = await fs.stat(path.join(folder, file));
      if (fileStat.isFile() && extensions.includes(path.extname(file))) {
        filesToValidate.push(path.join(folder, file));
      }
    }
    return filesToValidate;
  });
  return (await Promise.all(folders)).filter(folder => folder.length).flat();
};
