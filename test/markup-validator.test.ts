import fs from "node:fs";

import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { MarkupValidator } from "../src/index.js";
import { displayReporting } from "../src/utils/display-reporting.js";
import { dryRunNotice } from "../src/utils/dry-run-notice.js";
import { getFilesToValidate } from "../src/utils/get-files-to-validate.js";
import { prepareReporting } from "../src/utils/prepare-reporting.js";
import { CSSValidator } from "../src/validators/css-validator.js";
import { HTMLValidator } from "../src/validators/html-validator.js";
import { SVGValidator } from "../src/validators/svg-validator.js";
import { mockedOptions } from "./fixtures/mocked-options.js";

beforeEach(() => {
  vi.mock("../src/utils/dry-run-notice.js", () => ({ dryRunNotice: vi.fn() }));
  vi.mock("../src/utils/get-files-to-validate.js", () => ({ getFilesToValidate: vi.fn() }));
  vi.mock("../src/utils/prepare-reporting.js", () => ({ prepareReporting: vi.fn() }));
  vi.mock("../src/utils/display-reporting.js", () => ({ displayReporting: vi.fn() }));
  vi.mock("../src/validators/html-validator.js", () => {
    const MockClass = vi.fn();
    MockClass.prototype.validate = vi.fn().mockResolvedValue({ version: "1.0", messages: [] });
    return { HTMLValidator: MockClass };
  });
  vi.mock("../src/validators/css-validator.js", () => {
    const MockClass = vi.fn();
    MockClass.prototype.validate = vi.fn().mockResolvedValue({ version: "1.0", messages: [] });
    return { CSSValidator: MockClass };
  });
  vi.mock("../src/validators/svg-validator.js", () => {
    const MockClass = vi.fn();
    MockClass.prototype.validate = vi.fn().mockResolvedValue({ version: "1.0", messages: [] });
    return { SVGValidator: MockClass };
  });
  vi.useFakeTimers();
});
afterEach(() => {
  vi.clearAllMocks();
  vi.useRealTimers();
});

it("should be an instance of MarkupValidator", () => {
  const markupValidator = new MarkupValidator();
  expect(markupValidator).toBeInstanceOf(MarkupValidator);
});
it.each(mockedOptions)("should instantiate the object with $0", options => {
  const markupValidator = new MarkupValidator(options);
  expect(markupValidator).toHaveProperty("options", options);
});
it("should skip validatation on dry-run mode", async () => {
  const markupValidator = new MarkupValidator({ dryRun: true });
  await markupValidator.validate();
  expect(markupValidator).toHaveProperty("options", { dryRun: true });
  expect(dryRunNotice).toHaveBeenCalled();
  expect(getFilesToValidate).not.toHaveBeenCalled();
  expect(prepareReporting).not.toHaveBeenCalled();
  expect(displayReporting).not.toHaveBeenCalled();
});
it("should not call any language validations when there are no files to validate", async () => {
  vi.mocked(getFilesToValidate).mockResolvedValue([]);
  const markupValidator = new MarkupValidator();
  await markupValidator.validate();
  expect(dryRunNotice).not.toHaveBeenCalled();
  expect(HTMLValidator).not.toHaveBeenCalled();
  expect(CSSValidator).not.toHaveBeenCalled();
  expect(SVGValidator).not.toHaveBeenCalled();
  expect(prepareReporting).not.toHaveBeenCalled();
  expect(displayReporting).not.toHaveBeenCalled();
});
it("should call the appropriate language validations when there are files to validate and no options set", async () => {
  vi.spyOn(fs, "readFileSync").mockReturnValue("fake-content");
  vi.mocked(getFilesToValidate).mockResolvedValue([
    "/fake/path/index.html",
    "/fake/path/styles.css"
  ]);
  const markupValidator = new MarkupValidator();
  await markupValidator.validate();
  await vi.runAllTimersAsync();
  expect(dryRunNotice).not.toHaveBeenCalled();
  expect(HTMLValidator).toHaveBeenCalled();
  expect(CSSValidator).toHaveBeenCalled();
  expect(SVGValidator).not.toHaveBeenCalled();
  expect(prepareReporting).toHaveBeenCalled();
  expect(displayReporting).toHaveBeenCalled();
});
it("should call the appropriate language validations when `files` option is set", async () => {
  vi.spyOn(fs, "readFileSync").mockReturnValue("fake-content");
  vi.mocked(getFilesToValidate).mockResolvedValue([
    "/fake/path/selected.html",
    "/fake/path/selected.svg"
  ]);
  const markupValidator = new MarkupValidator({ files: ["selected.html", "selected.svg"] });
  await markupValidator.validate();
  await vi.runAllTimersAsync();
  expect(dryRunNotice).not.toHaveBeenCalled();
  expect(HTMLValidator).toHaveBeenCalled();
  expect(CSSValidator).not.toHaveBeenCalled();
  expect(SVGValidator).toHaveBeenCalled();
  expect(prepareReporting).toHaveBeenCalled();
  expect(displayReporting).toHaveBeenCalled();
});
it("should call the appropriate language validations when `languages` option is set", async () => {
  vi.spyOn(fs, "readFileSync").mockReturnValue("fake-content");
  vi.mocked(getFilesToValidate).mockResolvedValue(["/fake/path/styles.css", "/fake/path/icon.svg"]);
  const markupValidator = new MarkupValidator({ languages: ["css", "svg"] });
  await markupValidator.validate();
  await vi.runAllTimersAsync();
  expect(dryRunNotice).not.toHaveBeenCalled();
  expect(HTMLValidator).not.toHaveBeenCalled();
  expect(CSSValidator).toHaveBeenCalled();
  expect(SVGValidator).toHaveBeenCalled();
  expect(prepareReporting).toHaveBeenCalled();
  expect(displayReporting).toHaveBeenCalled();
});
