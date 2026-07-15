import { expect, it, vi } from "vitest";

import { postDocumentUsingRest } from "../../src/utils/post-document-using-rest.js";
import { CSSValidator } from "../../src/validators/css-validator.js";
import { mockedInvalidCSSFilesResults } from "../fixtures/mocked-invalid-css-files-results.js";
import { mockedValidCSSFilesResults } from "../fixtures/mocked-valid-css-files-results.js";
import { mockedCSSHeaders } from "../utils/fixtures/mocked-headers.js";

vi.mock("../../src/utils/post-document-using-rest.js", () => ({
  postDocumentUsingRest: vi.fn()
}));

it("should be an instance of CSSValidator", () => {
  const cssValidator = new CSSValidator("fake-css-content");
  expect(cssValidator).toBeInstanceOf(CSSValidator);
});
it.each([...mockedValidCSSFilesResults, ...mockedInvalidCSSFilesResults])(
  "should instantiate the object with the file contents",
  ({ content }) => {
    const cssValidator = new CSSValidator(content);
    expect(cssValidator).toHaveProperty("content", content);
  }
);
it.each(mockedValidCSSFilesResults)(
  "should return a JSON output with an empty array of messages or warning messages",
  async ({ content, ignoreLevel, expectedEntryPoint, expectedResult }) => {
    vi.mocked(postDocumentUsingRest).mockResolvedValue(expectedResult);
    const cssValidator = new CSSValidator(content, ignoreLevel);
    const result = await cssValidator.validate();
    expect(postDocumentUsingRest).toHaveBeenCalledWith(
      expectedEntryPoint,
      content,
      mockedCSSHeaders
    );
    expect(result).toEqual(expectedResult);
  }
);
it.each(mockedInvalidCSSFilesResults)(
  "should return a JSON output with messages according to the level requested",
  async ({ content, ignoreLevel, expectedEntryPoint, expectedResult }) => {
    vi.mocked(postDocumentUsingRest).mockResolvedValue(expectedResult);
    const cssValidator = new CSSValidator(content, ignoreLevel);
    const result = await cssValidator.validate();
    expect(postDocumentUsingRest).toHaveBeenCalledWith(
      expectedEntryPoint,
      content,
      mockedCSSHeaders
    );
    expect(result).toEqual(expectedResult);
  }
);
