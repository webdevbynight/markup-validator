import { expect, it } from "vitest";

import { patternToRegex } from "../../src/utils/pattern-to-regex.js";
import { regexPatterns } from "./fixtures/regex-patterns.js";

it.each(regexPatterns)("should convert $pattern to $regex", ({ pattern, regex }) => {
  expect(patternToRegex(pattern)).toStrictEqual(regex);
});
