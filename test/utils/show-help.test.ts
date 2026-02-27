import childProcess from "node:child_process";

import { expect, it, vi } from "vitest";

import { showHelp } from "../../src/utils/show-help.js";

const cliOptions = ["-h", "--help"];
const expectedOutput = `Checks validity of HTML, CSS and SVG documents

Usage:
  markup-validator [flags]

Options
  -f, --files         Files to validate                       [array]
  -p, --paths         Folders to include for validation       [array]
  -e, --exclude       Paths to skip                           [array]
  -l, --languages     Languages to validate                   [array]
  -d, --dry-run       Bypass validation                     [boolean]
  -i, --ignore-level  Ignore this level and the lower ones   [string]
  -v, --version       Show version number                   [boolean]
  -h, --help          Show help                             [boolean]`;

it.each(cliOptions)("should display the help content when using the `%s` command", option => {
  const mockedConsoleLog = vi.spyOn(console, "log").mockImplementation(() => undefined);
  vi.spyOn(childProcess, "execSync").mockReturnValue(`npx markup-validator ${option}`);
  showHelp();
  expect(mockedConsoleLog).toHaveBeenCalledWith(expectedOutput);
});
