import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { prepareReporting } from "../../src/utils/prepare-reporting.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";
import { mockedInvalidResultReporting } from "./fixtures/mocked-invalid-result-reporting.js";
import { mockedValidResultReporting } from "./fixtures/mocked-valid-result-reporting.js";

beforeEach(() => {
  vi.mock("node:process", () => ({ cwd: vi.fn(() => mockedCwd) }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it.each([
  ...mockedValidResultReporting,
  ...mockedInvalidResultReporting
])("should prepare reporting for each document", ({ file, language, result, reporting }) => {
  expect(prepareReporting(file, language, result)).toStrictEqual(reporting);
});
