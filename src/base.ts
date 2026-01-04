import eslint from "@eslint/js";
import type { Linter } from "eslint";

import prettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

/**
 * Common strict rules for TypeScript projects
 *
 * Note: Prettier is run separately from ESLint to avoid conflicts with @prettier/plugin-oxc.
 * Use `bun run format:fix` to format code with prettier.
 */
export const strictTypeScriptRules: Linter.RulesRecord = {
  // TypeScript specific rules
  "@typescript-eslint/no-deprecated": "warn",
  "@typescript-eslint/no-unused-vars": [
    "error",
    {
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^_",
    },
  ],
  "@typescript-eslint/consistent-type-imports": [
    "error",
    {
      prefer: "type-imports",
      fixStyle: "inline-type-imports",
    },
  ],
  "@typescript-eslint/no-import-type-side-effects": "error",
  "@typescript-eslint/no-explicit-any": "off",
  "@typescript-eslint/no-non-null-assertion": "off",
  "@typescript-eslint/explicit-module-boundary-types": "off",
  // Code quality rules
  "prefer-const": "error",
  "no-var": "error",
};

/**
 * Rules for test files (without type checking)
 */
export const testFileRules: Linter.RulesRecord = {
  ...strictTypeScriptRules,
  // Disable type-aware rules for test files
  "@typescript-eslint/no-unsafe-assignment": "off",
  "@typescript-eslint/no-unsafe-member-access": "off",
  "@typescript-eslint/no-unsafe-call": "off",
  "@typescript-eslint/no-unsafe-return": "off",
  "@typescript-eslint/no-floating-promises": "off",
  "@typescript-eslint/require-await": "off",
  "@typescript-eslint/await-thenable": "off",
  // Allow @ts-nocheck and require() in test files
  "@typescript-eslint/ban-ts-comment": "off",
  "@typescript-eslint/no-require-imports": "off",
};

/**
 * Common ignore patterns
 */
export const ignorePatterns: string[] = [
  "**/node_modules/**",
  "**/dist/**",
  "**/.turbo/**",
  "**/.wxt/**",
  "**/.vocs/**",
  "**/.output/**",
  "**/.wrangler/**",
  "**/.cursor/**",
  "**/*.lock",
  "**/.env*",
  "**/*.log",
  "**/.DS_Store",
  "**/migrations/**",
  "**/*.json",
  "**/*.jsonc",
  "**/*.json5",
  "**/*.md",
  "**/*.mdx",
];

const jsLikeFiles = ["**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}"] as const;

const globalIgnoresConfig: Linter.Config = {
  name: "@posaune0423/ignores",
  ignores: ignorePatterns,
};

const baseLanguageOptionsConfig: Linter.Config = {
  name: "@posaune0423/base/language-options",
  files: [...jsLikeFiles],
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    globals: {
      ...globals.es2022,
    },
  },
};

const baseRulesConfig: Linter.Config = {
  name: "@posaune0423/base/rules",
  files: [...jsLikeFiles],
  rules: {
    ...strictTypeScriptRules,
    "@typescript-eslint/no-deprecated": "error",
  },
};

/**
 * Type-checked base configuration
 * Use this for projects with proper tsconfig setup
 */
export const baseConfig: Linter.Config[] = [
  globalIgnoresConfig,
  eslint.configs.recommended,
  baseLanguageOptionsConfig,
  ...tseslint.configs.recommendedTypeChecked,
  baseRulesConfig,
  // Prettier config to disable conflicting rules (must be last to override other configs)
  prettier,
];

export default baseConfig;
