import type { Stats } from "node:fs";

import fs from "node:fs/promises";

import { beforeEach, expect, it, vi } from "vitest";

import { browseFolders } from "../../src/utils/browse-folders.js";
import { getFilesToValidate } from "../../src/utils/get-files-to-validate.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";

const mockedTree = [`${mockedCwd}/docs`, `${mockedCwd}/node_modules/dependency/docs`];
const mockedFiles: Record<string, string[]> = {
  "/fake/path/docs": [
    "index.html",
    "build.html",
    "tmp.html",
    "styles.css",
    "index.js",
    "graphic.svg"
  ],
  "/fake/path/node_modules/dependency/docs": ["index.html", "styles.css", "graphic.svg"]
};

vi.mock("node:process", () => ({ cwd: vi.fn(() => mockedCwd) }));
vi.mock("../../src/utils/browse-folders.js", () => ({ browseFolders: vi.fn() }));

beforeEach(() => {
  vi.mocked(browseFolders).mockResolvedValue(mockedTree);
  vi.spyOn(fs, "readdir").mockImplementation(path => {
    const pathStr = path.toString();
    const folderKey = mockedTree.find(folder => pathStr.includes(folder));
    return Promise.resolve(mockedFiles[folderKey ?? ""] || []) as unknown as ReturnType<
      typeof fs.readdir
    >;
  });
  vi.spyOn(fs, "stat").mockImplementation(() => {
    return Promise.resolve({
      isFile: () => true
    } as Stats);
  });
});

it("should return all files to validate", async () => {
  expect(await getFilesToValidate()).toEqual([
    `${mockedCwd}/docs/index.html`,
    `${mockedCwd}/docs/build.html`,
    `${mockedCwd}/docs/tmp.html`,
    `${mockedCwd}/docs/styles.css`,
    `${mockedCwd}/docs/graphic.svg`
  ]);
});
it("should return all files from `docs` to validate", async () => {
  expect(await getFilesToValidate({ paths: ["docs"] })).toEqual([
    `${mockedCwd}/docs/index.html`,
    `${mockedCwd}/docs/build.html`,
    `${mockedCwd}/docs/tmp.html`,
    `${mockedCwd}/docs/styles.css`,
    `${mockedCwd}/docs/graphic.svg`
  ]);
});
it("should return no files if no valid files to validate are found in paths", async () => {
  expect(await getFilesToValidate({ paths: ["some-folder"] })).toEqual([]);
});
it("should return no files from those matching the patterns declared in `exclude` option", async () => {
  expect(await getFilesToValidate({ exclude: ["build", "tmp"] })).toEqual([
    `${mockedCwd}/docs/index.html`,
    `${mockedCwd}/docs/styles.css`,
    `${mockedCwd}/docs/graphic.svg`
  ]);
});
it("should return all HTML files to validate", async () => {
  expect(await getFilesToValidate({ languages: ["html"] })).toEqual([
    `${mockedCwd}/docs/index.html`,
    `${mockedCwd}/docs/build.html`,
    `${mockedCwd}/docs/tmp.html`
  ]);
});
it("should return all CSS files to validate", async () => {
  expect(await getFilesToValidate({ languages: ["css"] })).toEqual([
    `${mockedCwd}/docs/styles.css`
  ]);
});
it("should return all SVG files to validate", async () => {
  expect(await getFilesToValidate({ languages: ["svg"] })).toEqual([
    `${mockedCwd}/docs/graphic.svg`
  ]);
});
it("should return all files from `files` option", async () => {
  expect(
    await getFilesToValidate({ files: ["selected/selected.html", "icons/icon-data.svg"] })
  ).toEqual([`${mockedCwd}/selected/selected.html`, `${mockedCwd}/icons/icon-data.svg`]);
});
it("should give `files` option precedence over other options", async () => {
  expect(await getFilesToValidate({ files: ["icons/icon-data.svg"], languages: ["html"] })).toEqual(
    [`${mockedCwd}/icons/icon-data.svg`]
  );
});
