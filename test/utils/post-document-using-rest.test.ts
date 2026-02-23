import { afterEach, expect, it, vi } from "vitest";

import { postDocumentUsingRest } from "../../src/utils/post-document-using-rest.js";
import { mockedDocument } from "./fixtures/mocked-document.js";
import { mockedEntryPoint } from "./fixtures/mocked-entry-points.js";
import { mockedHTMLHeaders } from "./fixtures/mocked-headers.js";

afterEach(() => {
  vi.unstubAllGlobals();
});

it("should throw an error if the response is not OK or has a non-200 status", () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: "Not Found"
      })
    )
  );
  expect(
    postDocumentUsingRest(mockedEntryPoint, mockedDocument, mockedHTMLHeaders)
  ).rejects.toThrowError("Failed to post the document: 404, Not Found.");
});
it("should return the JSON data if the response is OK and has a 200 status", async () => {
  const mockedData = {
    version: "26.2.5",
    messages: []
  };
  vi.stubGlobal(
    "fetch",
    vi.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        status: 200,
        statusText: "OK",
        json: () => Promise.resolve(mockedData)
      });
    })
  );
  expect(await postDocumentUsingRest(mockedEntryPoint, mockedDocument, mockedHTMLHeaders)).toEqual(
    mockedData
  );
});
