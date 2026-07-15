import { expect, it, vi } from "vitest";

import { postDocumentUsingRest } from "../../src/utils/post-document-using-rest.js";
import { HTMLValidator } from "../../src/validators/html-validator.js";
import { mockedInvalidHTMLFilesResults } from "../fixtures/mocked-invalid-html-files-results.js";
import { mockedValidHTMLFilesResults } from "../fixtures/mocked-valid-html-files-results.js";
import { mockedHTMLHeaders } from "../utils/fixtures/mocked-headers.js";

vi.mock("../../src/utils/post-document-using-rest.js", () => ({
  postDocumentUsingRest: vi.fn()
}));

it("should be an instance of HTMLValidator", () => {
  const htmlValidator = new HTMLValidator("fake-html-content");
  expect(htmlValidator).toBeInstanceOf(HTMLValidator);
});
it.each([...mockedValidHTMLFilesResults, ...mockedInvalidHTMLFilesResults])(
  "should instantiate the object with the file contents",
  ({ content }) => {
    const htmlValidator = new HTMLValidator(content);
    expect(htmlValidator).toHaveProperty("content", content);
  }
);
it.each(mockedValidHTMLFilesResults)(
  "should return a JSON output with an empty array of messages or warning messages",
  async ({ content, ignoreLevel, expectedEntryPoint, expectedResult }) => {
    vi.mocked(postDocumentUsingRest).mockResolvedValue(expectedResult);
    const htmlValidator = new HTMLValidator(content, ignoreLevel);
    const result = await htmlValidator.validate();
    expect(postDocumentUsingRest).toHaveBeenCalledWith(
      expectedEntryPoint,
      content,
      mockedHTMLHeaders
    );
    expect(result).toEqual(expectedResult);
  }
);
it.each(mockedInvalidHTMLFilesResults)(
  "should return a JSON output with messages according to the level requested",
  async ({ content, ignoreLevel, expectedEntryPoint, expectedResult }) => {
    vi.mocked(postDocumentUsingRest).mockResolvedValue(expectedResult);
    const htmlValidator = new HTMLValidator(content, ignoreLevel);
    const result = await htmlValidator.validate();
    expect(postDocumentUsingRest).toHaveBeenCalledWith(
      expectedEntryPoint,
      content,
      mockedHTMLHeaders
    );
    expect(result).toEqual(expectedResult);
  }
);
