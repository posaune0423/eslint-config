import eslint from "@eslint/js";
import type { Linter } from "eslint";

import prettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";
import { ignorePatterns, strictTypeScriptRules, testFileRules } from "./base";

/**
 * Node.js ESLint configuration with type checking
 * Includes separate config for test files (without type checking)
 *
 * Note: Prettier is run separately from ESLint to avoid conflicts with @prettier/plugin-oxc.
 * Use `bun run format:fix` to format code with prettier.
 */
const nodeSourceFiles = [
  "src/**/*.{js,mjs,cjs,ts,mts,cts}",
  "scripts/**/*.{js,mjs,cjs,ts,mts,cts}",
];

const nodeTestFiles = [
  "tests/**/*.{js,mjs,cjs,ts,mts,cts}",
  "**/*.test.{ts,tsx}",
  "**/*.spec.{ts,tsx}",
];

const nodeConfigFiles = ["*.config.ts", "*.config.js", "*.config.mjs"];

const nodeLanguageOptions = {
  ecmaVersion: 2022,
  sourceType: "module",
  globals: {
    ...globals.es2022,
    ...globals.node,
  },
} as const;

const nodeSourceTypeCheckedConfigs: Linter.Config[] =
  tseslint.configs.recommendedTypeChecked.map((conf) => ({
    ...conf,
    files: nodeSourceFiles,
  }));

const nodeSourceOverridesConfig: Linter.Config = {
  name: "@posaune0423/node/source",
  files: nodeSourceFiles,
  languageOptions: {
    ...nodeLanguageOptions,
    parserOptions: {
      projectService: true,
    },
  },
  rules: {
    ...strictTypeScriptRules,
    "@typescript-eslint/no-deprecated": "error",
  },
};

const nodeConfigFilesConfig: Linter.Config = {
  name: "@posaune0423/node/config-files",
  files: nodeConfigFiles,
  languageOptions: nodeLanguageOptions,
  rules: strictTypeScriptRules,
};

const nodeTestFilesConfig: Linter.Config = {
  name: "@posaune0423/node/tests",
  files: nodeTestFiles,
  languageOptions: nodeLanguageOptions,
  rules: testFileRules,
};

const nodeIgnoresConfig: Linter.Config = {
  name: "@posaune0423/node/ignores",
  ignores: ignorePatterns,
};

export const nodeConfig: Linter.Config[] = [
  nodeIgnoresConfig,
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...nodeSourceTypeCheckedConfigs,
  nodeSourceOverridesConfig,
  nodeConfigFilesConfig,
  nodeTestFilesConfig,
  // Prettier config to disable conflicting rules (must be last to override other configs)
  prettier,
];

export default nodeConfig;
