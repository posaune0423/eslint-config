import type { Linter } from "eslint";
import posaune0423 from "./src";

export default [
  ...posaune0423(),
  // Repo-only ignores (fixtures are linted separately in integration tests)
  { ignores: ["tests/fixtures/**"] },
  // Repo-only overrides for tests.
  {
    files: ["tests/**/*.{ts,tsx,js,jsx,mts,cts}"],
    rules: {
      // Test helpers frequently use dynamic key access and core ESLint APIs marked as deprecated.
      "security/detect-object-injection": "off",
      "@typescript-eslint/no-deprecated": "off",
    },
  },
  {
    languageOptions: {
      parserOptions: {
        // Enable typed linting for this repo's sources/tests.
        // Note: fixtures are excluded from tsconfig and ignored above.
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
] as Linter.Config[];
