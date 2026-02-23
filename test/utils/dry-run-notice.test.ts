import { expect, it, vi } from "vitest";

import { dryRunNotice } from "../../src/utils/dry-run-notice.js";

const workspaceName = "markup-validator";

it("should print dry-run notice with validation skipped message", () => {
  const consoleInfoSpy = vi.spyOn(console, "info");
  dryRunNotice();
  expect(consoleInfoSpy).toHaveBeenCalledWith(
    `[${workspaceName}]`,
    "Dry-run mode: validation skipped."
  );
});
