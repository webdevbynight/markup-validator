import childProcess from "node:child_process";

import { expect, it, vi } from "vitest";

import packageManifest from "../../package.json" with { type: "json" };
import { showVersion } from "../../src/utils/show-version.js";

const cliOptions = ["-v", "--version"];
const expectedVersion = packageManifest.version;

it.each(
  cliOptions
)(`should display a message saying \`${expectedVersion}\` when using the \`%s\` command`, cliOption => {
  const mockedConsoleLog = vi.spyOn(console, "log").mockImplementation(() => undefined);
  vi.spyOn(childProcess, "execSync").mockReturnValue(`npx markup-validator ${cliOption}`);
  showVersion();
  expect(mockedConsoleLog).toHaveBeenCalledWith(expectedVersion);
});
