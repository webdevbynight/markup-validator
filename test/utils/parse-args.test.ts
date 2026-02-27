import { expect, it } from "vitest";

import { parseArgs } from "../../src/utils/parse-args.js";
import { mockedArgs } from "./fixtures/mocked-args.js";

it.each(mockedArgs)("should return the options based on the args", ({ args, expected }) => {
  expect(parseArgs(args)).toEqual(expected);
});
