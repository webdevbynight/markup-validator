import fs from "node:fs/promises";

import { expect, it, vi } from "vitest";

import { browseFolders } from "../../src/utils/browse-folders.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";

const mockedDirent = {
  isBlockDevice() {
    return false;
  },
  isCharacterDevice() {
    return false;
  },
  isFIFO() {
    return false;
  },
  isFile() {
    return false;
  },
  isSocket() {
    return false;
  },
  isSymbolicLink() {
    return false;
  }
};

it("should return only the folder itself if the folder is empty", async () => {
  vi.spyOn(fs, "readdir").mockResolvedValue([]);
  expect(await browseFolders(mockedCwd)).toStrictEqual([mockedCwd]);
});
it("should browse folders recursively", async () => {
  vi.spyOn(fs, "readdir").mockImplementation(async dirPath => {
    if (dirPath === mockedCwd) {
      return [
        {
          ...mockedDirent,
          name: "folder1" as unknown as Buffer<ArrayBuffer>,
          isDirectory: () => true,
          parentPath: mockedCwd
        },
        {
          ...mockedDirent,
          name: "folder2" as unknown as Buffer<ArrayBuffer>,
          isDirectory: () => true,
          parentPath: mockedCwd
        }
      ];
    }
    if (dirPath === `${mockedCwd}/folder1`) {
      return [
        {
          ...mockedDirent,
          name: "subfolder1" as unknown as Buffer<ArrayBuffer>,
          isDirectory: () => true,
          parentPath: `${mockedCwd}/folder1`
        }
      ];
    }
    if (dirPath === `${mockedCwd}/folder2`) {
      return [
        {
          ...mockedDirent,
          name: "subfolder2" as unknown as Buffer<ArrayBuffer>,
          isDirectory: () => true,
          parentPath: `${mockedCwd}/folder2`
        }
      ];
    }
    return [];
  });
  expect(await browseFolders(mockedCwd)).toStrictEqual([
    mockedCwd,
    `${mockedCwd}/folder1`,
    `${mockedCwd}/folder1/subfolder1`,
    `${mockedCwd}/folder2`,
    `${mockedCwd}/folder2/subfolder2`
  ]);
});
