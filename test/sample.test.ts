import { expect, it } from "vitest";

it("tests adding numbers", () => {
  const add = (a: number, b: number) => a + b;
  expect(add(1, 2)).toBe(3);
});
