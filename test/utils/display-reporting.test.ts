import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { displayReporting } from "../../src/utils/display-reporting.js";
import { mockedInvalidResultReporting } from "./fixtures/mocked-invalid-result-reporting.js";
import { mockedValidResultReporting } from "./fixtures/mocked-valid-result-reporting.js";

const workspaceName = "[markup-validator]";
const times = [
  { mockedTimestamp: 1735707843000, expectedTime: "05:04:03" },
  { mockedTimestamp: 1735738662000, expectedTime: "13:37:42" }
];
let consoleGroupSpy: ReturnType<typeof vi.spyOn>;
let consoleGroupEndSpy: ReturnType<typeof vi.spyOn>;
let consoleInfoSpy: ReturnType<typeof vi.spyOn>;
let consoleWarnSpy: ReturnType<typeof vi.spyOn>;
let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  consoleGroupSpy = vi.spyOn(console, "group").mockImplementation(() => {});
  consoleGroupEndSpy = vi.spyOn(console, "groupEnd").mockImplementation(() => {});
  consoleInfoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
  consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => {
  vi.clearAllMocks();
});

describe.each(times)("at $expectedTime (timestamp $mockedTimestamp)", ({
  mockedTimestamp,
  expectedTime
}) => {
  it.each(mockedValidResultReporting)("should display a success reporting", ({
    language,
    reporting,
    url,
    logs
  }) => {
    displayReporting(reporting, mockedTimestamp);
    expect(consoleGroupSpy).toHaveBeenCalledWith(
      `[${expectedTime}]`,
      workspaceName,
      `[${language.toUpperCase()}]`,
      url
    );
    expect(consoleInfoSpy).toHaveBeenCalledWith("\x1b[1;32m\u2714 pass\x1b[0m");
    expect(consoleGroupEndSpy).toHaveBeenCalled();
    if (reporting.messages && logs) {
      for (const log of logs) {
        const { message, place, extract } = log;
        if (place && extract) {
          expect(consoleWarnSpy).toHaveBeenCalledWith("\x1b[1;33mWarning:\x1b[0m", message);
          expect(consoleInfoSpy).toHaveBeenCalledWith(`${place}:`, extract);
        } else {
          expect(consoleInfoSpy).toHaveBeenCalledWith("\x1b[1;34mInfo:\x1b[0m", message);
        }
      }
    } else expect(consoleWarnSpy).not.toHaveBeenCalled();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });
  it.each(mockedInvalidResultReporting)("should display a fail reporting", ({
    language,
    reporting,
    url,
    messages,
    logs
  }) => {
    displayReporting(reporting, mockedTimestamp);
    expect(consoleGroupSpy).toHaveBeenCalledWith(
      `[${expectedTime}]`,
      workspaceName,
      `[${language.toUpperCase()}]`,
      url
    );
    expect(consoleInfoSpy).toHaveBeenCalledWith(
      "\x1b[1;31m\u2718 fail\x1b[0m",
      `(messages: ${messages})`
    );
    for (const log of logs) {
      const { level, message, place, extract } = log;
      if (level === "Error") {
        expect(consoleErrorSpy).toHaveBeenCalledWith(`\x1b[1;31m${level}:\x1b[0m`, message);
      } else if (level === "Warning") {
        expect(consoleWarnSpy).toHaveBeenCalledWith(`\x1b[1;33m${level}:\x1b[0m`, message);
      } else {
        expect(consoleInfoSpy).toHaveBeenCalledWith(`\x1b[1;34m${level}:\x1b[0m`, message);
      }
      if (place && extract) expect(consoleInfoSpy).toHaveBeenCalledWith(`${place}:`, extract);
    }
    expect(consoleGroupEndSpy).toHaveBeenCalled();
  });
});
