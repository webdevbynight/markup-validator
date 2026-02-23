import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    silent: true,
    typecheck: {
      enabled: true,
      tsconfig: "./tsconfig.test.json",
      include: ["test/**/*.test.ts"]
    }
  }
});
