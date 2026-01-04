import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";
import type { ConfigArray } from "typescript-eslint";
import { ignorePatterns, strictTypeScriptRules, testFileRules } from "./base";

/**
 * React ESLint configuration with type checking
 * Includes separate config for test files (without type checking)
 *
 * Note: Prettier is run separately from ESLint to avoid conflicts with @prettier/plugin-oxc.
 * Use `bun run format:fix` to format code with prettier.
 */
const reactSourceFiles = [
  "src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
  "docs/**/*.{ts,tsx,mdx}",
];

const reactTestFiles = [
  "tests/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
  "**/*.test.{ts,tsx}",
  "**/*.spec.{ts,tsx}",
];

const reactConfigFiles = ["*.config.ts", "*.config.js", "*.config.mjs"];

const browserLanguageOptions = {
  ecmaVersion: 2022,
  sourceType: "module",
  globals: {
    ...globals.es2022,
    ...globals.browser,
  },
} as const;

const nodeLanguageOptions = {
  ecmaVersion: 2022,
  sourceType: "module",
  globals: {
    ...globals.es2022,
    ...globals.node,
  },
} as const;

const reactPlugins = {
  react: reactPlugin,
  "react-hooks": reactHooksPlugin,
};

const reactSettings = {
  react: {
    version: "detect",
  },
} as const;

const reactTypeCheckedConfigs = tseslint.configs.recommendedTypeChecked.map(
  (conf) => ({
    ...conf,
    files: reactSourceFiles,
  }),
);

const reactSourceConfig = {
  name: "@posaune0423/react/source",
  files: reactSourceFiles,
  languageOptions: {
    ...browserLanguageOptions,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      projectService: true,
    },
  },
  plugins: reactPlugins,
  settings: reactSettings,
  rules: {
    ...strictTypeScriptRules,
    ...reactPlugin.configs.recommended.rules,
    ...reactHooksPlugin.configs.recommended.rules,
    "react-hooks/exhaustive-deps": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
} as const;

const reactConfigFilesConfig = {
  name: "@posaune0423/react/config-files",
  files: reactConfigFiles,
  languageOptions: nodeLanguageOptions,
  rules: strictTypeScriptRules,
} as const;

const reactTestFilesConfig = {
  name: "@posaune0423/react/tests",
  files: reactTestFiles,
  languageOptions: browserLanguageOptions,
  plugins: reactPlugins,
  settings: reactSettings,
  rules: {
    ...testFileRules,
    ...reactPlugin.configs.recommended.rules,
    ...reactHooksPlugin.configs.recommended.rules,
    "react-hooks/exhaustive-deps": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
} as const;

const reactIgnoresConfig = {
  name: "@posaune0423/react/ignores",
  ignores: ignorePatterns,
} as const;

export const reactConfig: ConfigArray = [
  reactIgnoresConfig,
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...reactTypeCheckedConfigs,
  reactSourceConfig,
  reactConfigFilesConfig,
  reactTestFilesConfig,
  // Prettier config to disable conflicting rules (must be last to override other configs)
  prettier,
];

export default reactConfig;
