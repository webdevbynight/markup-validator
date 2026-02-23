import type { ValidationResult } from "../types.js";

import { USER_AGENT } from "../constants.js";

/**
 * Posts the document to the specified entry point using the REST API.
 *
 * @param entryPoint - The entry point to use.
 * @param document - The document to post.
 * @param headers - The headers to use.
 * @return The JSON data returned by the REST API.
 */
export const postDocumentUsingRest = async (
  entryPoint: string,
  document: string,
  headers: Record<string, string>
): Promise<ValidationResult> => {
  const response = await fetch(entryPoint, {
    method: "POST",
    headers: { ...headers, "User-Agent": USER_AGENT },
    body: document
  });
  const { ok, status, statusText } = response;
  if (ok && status === 200) return await response.json();
  throw new Error(`Failed to post the document: ${status}, ${statusText}.`);
};
