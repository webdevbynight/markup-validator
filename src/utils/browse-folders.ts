import fs from "node:fs/promises";
import path from "node:path";

/**
 * Browses the folders recursively from the given folder.
 * @param folder - The folder from which to start the browsing.
 * @return An array of all the directories found recursively.
 */
export const browseFolders = async (folder: string): Promise<string[]> => {
  const entries = (await fs.readdir(folder, { withFileTypes: true })).map(async entry => {
    const pathToEntry = path.join(folder, entry.name);
    if (entry.isDirectory()) {
      const subDirectories = await browseFolders(pathToEntry);
      return [pathToEntry, ...subDirectories];
    }
    return [];
  });
  const directories = await Promise.all(entries);
  return directories.flat();
};
