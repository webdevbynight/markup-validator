import { expect, it, vi } from "vitest";

import { postDocumentUsingRest } from "../../src/utils/post-document-using-rest.js";
import { SVGValidator } from "../../src/validators/svg-validator.js";
import { mockedInvalidSVGFilesResults } from "../fixtures/mocked-invalid-svg-files-results.js";
import { mockedValidSVGFilesResults } from "../fixtures/mocked-valid-svg-files-results.js";
import { mockedSVGHeaders } from "../utils/fixtures/mocked-headers.js";

vi.mock("../../src/utils/post-document-using-rest.js", () => ({
  postDocumentUsingRest: vi.fn()
}));

it("should be an instance of SVGValidator", () => {
  const svgValidator = new SVGValidator("fake-svg-content");
  expect(svgValidator).toBeInstanceOf(SVGValidator);
});
it.each([
  ...mockedValidSVGFilesResults,
  ...mockedInvalidSVGFilesResults
])("should instantiate the object with the file contents", ({ content }) => {
  const svgValidator = new SVGValidator(content);
  expect(svgValidator).toHaveProperty("content", content);
});
it.each(
  mockedValidSVGFilesResults
)("should return a JSON output with an empty array of messages or warning messages", async ({
  content,
  ignoreLevel,
  expectedEntryPoint,
  expectedResult
}) => {
  vi.mocked(postDocumentUsingRest).mockResolvedValue(expectedResult);
  const svgValidator = new SVGValidator(content, ignoreLevel);
  const result = await svgValidator.validate();
  expect(postDocumentUsingRest).toHaveBeenCalledWith(expectedEntryPoint, content, mockedSVGHeaders);
  expect(result).toEqual(expectedResult);
});
it.each(
  mockedInvalidSVGFilesResults
)("should return a JSON output with messages according to the level requested", async ({
  content,
  ignoreLevel,
  expectedEntryPoint,
  expectedResult
}) => {
  vi.mocked(postDocumentUsingRest).mockResolvedValue(expectedResult);
  const svgValidator = new SVGValidator(content, ignoreLevel);
  const result = await svgValidator.validate();
  expect(postDocumentUsingRest).toHaveBeenCalledWith(expectedEntryPoint, content, mockedSVGHeaders);
  expect(result).toEqual(expectedResult);
});
