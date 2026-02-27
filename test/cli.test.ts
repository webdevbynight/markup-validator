import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { cli, MarkupValidator } from "../src/index.js";
import { parseArgs } from "../src/utils/parse-args.js";
import { showHelp } from "../src/utils/show-help.js";
import { showVersion } from "../src/utils/show-version.js";
import { mockedArgs } from "./utils/fixtures/mocked-args.js";

let originalArgv: string[];

beforeEach(() => {
  vi.mock("../src/utils/show-help.js", () => ({ showHelp: vi.fn() }));
  vi.mock("../src/utils/show-version.js", () => ({ showVersion: vi.fn() }));
  vi.mock("../src/utils/parse-args.js", () => ({ parseArgs: vi.fn() }));
  vi.mock("../src/markup-validator.js", () => {
    const MockClass = vi.fn();
    MockClass.prototype.validate = vi.fn().mockResolvedValue({ version: "1.0", messages: [] });
    return { MarkupValidator: MockClass };
  });
  originalArgv = process.argv;
});
afterEach(() => {
  vi.clearAllMocks();
  process.argv = originalArgv;
});

it.each(["--help", "-h"])("should display help content when %s is passed", async flag => {
  process.argv = ["node", "cli.js", flag];
  await cli();
  expect(showHelp).toHaveBeenCalled();
});
it.each(["--version", "-v"])("should show version when %s is passed", async flag => {
  process.argv = ["node", "cli.js", flag];
  await cli();
  expect(showVersion).toHaveBeenCalled();
});
it.each(mockedArgs)("should validate files when $args is passed", async ({ args, expected }) => {
  process.argv = ["node", "cli.js", ...args];
  vi.mocked(parseArgs).mockReturnValueOnce(expected);
  await cli();
  expect(MarkupValidator).toHaveBeenCalled();
});
