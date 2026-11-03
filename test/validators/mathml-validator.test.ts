import { expect, it, vi } from "vitest";

import { postDocumentUsingRest } from "../../src/utils/post-document-using-rest.js";
import { MathMLValidator } from "../../src/validators/mathml-validator.js";
import { mockedInvalidMathMLFilesResults } from "../fixtures/mocked-invalid-mathml-files-results.js";
import { mockedValidMathMLFilesResults } from "../fixtures/mocked-valid-mathml-files-results.js";
import { mockedMathMLHeaders } from "../utils/fixtures/mocked-headers.js";

vi.mock("../../src/utils/post-document-using-rest.js", () => ({
  postDocumentUsingRest: vi.fn()
}));

it("should be an instance of MathMLValidator", () => {
  const mathmlValidator = new MathMLValidator("fake-mathml-content");
  expect(mathmlValidator).toBeInstanceOf(MathMLValidator);
});
it.each([...mockedValidMathMLFilesResults, ...mockedInvalidMathMLFilesResults])(
  "should instantiate the object with the file contents",
  ({ content }) => {
    const mathmlValidator = new MathMLValidator(content);
    expect(mathmlValidator).toHaveProperty("content", content);
  }
);
it.each(mockedValidMathMLFilesResults)(
  "should return a JSON output with an empty array of messages or warning messages",
  async ({ content, ignoreLevel, expectedEntryPoint, expectedResult }) => {
    vi.mocked(postDocumentUsingRest).mockResolvedValue(expectedResult);
    const mathmlValidator = new MathMLValidator(content, ignoreLevel);
    const result = await mathmlValidator.validate();
    expect(postDocumentUsingRest).toHaveBeenCalledWith(
      expectedEntryPoint,
      content,
      mockedMathMLHeaders
    );
    expect(result).toEqual(expectedResult);
  }
);
it.each(mockedInvalidMathMLFilesResults)(
  "should return a JSON output with messages according to the level requested",
  async ({ content, ignoreLevel, expectedEntryPoint, expectedResult }) => {
    vi.mocked(postDocumentUsingRest).mockResolvedValue(expectedResult);
    const mathmlValidator = new MathMLValidator(content, ignoreLevel);
    const result = await mathmlValidator.validate();
    expect(postDocumentUsingRest).toHaveBeenCalledWith(
      expectedEntryPoint,
      content,
      mockedMathMLHeaders
    );
    expect(result).toEqual(expectedResult);
  }
);
