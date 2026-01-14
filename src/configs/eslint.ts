import eslint from "@eslint/js";
import type { Linter } from "eslint";

/**
 * ESLint core recommended config.
 */
export function eslintConfig(): Linter.Config[] {
  return [
    // Ignore build output by default to avoid type-aware rules crashing on emitted JS.
    { ignores: ["dist/**"] },
    eslint.configs.recommended,
  ];
}
