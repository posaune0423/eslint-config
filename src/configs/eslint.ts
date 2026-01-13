import eslint from "@eslint/js";
import type { Linter } from "eslint";

/**
 * ESLint core recommended config.
 */
export function eslintConfig(): Linter.Config[] {
  return [eslint.configs.recommended];
}
