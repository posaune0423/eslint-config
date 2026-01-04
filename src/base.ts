import eslint from "@eslint/js";
import type { Linter } from "eslint";

import tseslint from "typescript-eslint";

/**
 * Minimal rules:
 * - Keep plugin recommended rules as the baseline
 * - Add only explicitly requested rules on top
 *
 * Note: Prettier is run separately from ESLint to avoid conflicts with @prettier/plugin-oxc.
 * Use `bun run format:fix` to format code with prettier.
 */
export const requestedTypeScriptRules: Linter.RulesRecord = {
  // general - deprecated syntax
  "@typescript-eslint/no-deprecated": "warn",
  // ts - sloppy types
  "@typescript-eslint/no-explicit-any": "error",
  // ts - always use `import type`
  "@typescript-eslint/consistent-type-imports": [
    "error",
    {
      prefer: "type-imports",
      // Enforce `import type { Foo } from "..."` instead of inline `import { type Foo } ...`.
      fixStyle: "separate-type-imports",
    },
  ],
};

export const baseRulesConfig: Linter.Config = {
  name: "@posaune0423/base/rules",
  files: ["**/*.{ts,mts,cts,tsx}"],
  languageOptions: {
    parserOptions: {
      projectService: {
        // Use the project's root tsconfig by default.
        defaultProject: "tsconfig.json",
      },
      // Use the caller's working directory as the tsconfig root.
      tsconfigRootDir: process.cwd(),
    },
  },
  rules: {
    ...requestedTypeScriptRules,
  },
};

/**
 * Base configuration for TypeScript projects.
 * Applies a single consistent rule set (no per-test-file or per-typechecked splits).
 */
export const baseConfig: Linter.Config[] = [
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  baseRulesConfig,
];

export default baseConfig;
