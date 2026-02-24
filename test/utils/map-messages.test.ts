import { expect, it } from "vitest";

import { mapMessages } from "../../src/utils/map-messages.js";
import { mockedMessagesToMap } from "./fixtures/mocked-messages-to-map.js";

it("should map the message to the format expected for reporting", () => {
  const { original, expected } = mockedMessagesToMap;
  expect(mapMessages(original)).toEqual(expected);
});
