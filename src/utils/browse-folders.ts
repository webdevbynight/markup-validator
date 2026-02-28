import fs from "node:fs/promises";
import path from "node:path";

/**
 * Browses the folders recursively from the given folder.
 * @param folder - The folder from which to start the browsing.
 * @return An array of all the directories found recursively, including the given folder.
 */
export const browseFolders = async (folder: string): Promise<string[]> => {
  const entries = (await fs.readdir(folder, { withFileTypes: true })).map(async entry => {
    const pathToEntry = path.join(folder, entry.name);
    if (entry.isDirectory()) return await browseFolders(pathToEntry);
    return [];
  });
  const directories = await Promise.all(entries);
  return [folder, ...directories.flat()];
};
