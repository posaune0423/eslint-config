import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

const jsLikeFiles = ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"];

/**
 * Repo-local ESLint config.
 *
 * This package exports shareable FlatConfig presets from TypeScript files.
 * ESLint itself loads `eslint.config.js`, so we keep the repo config in JS.
 */
export default [
  {
    name: "repo/ignores",
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.turbo/**",
      "**/.output/**",
      "**/.wrangler/**",
      "**/*.lock",
      "**/.env*",
      "**/*.log",
      "**/.DS_Store",
    ],
  },
  eslint.configs.recommended,
  {
    name: "repo/language-options",
    files: jsLikeFiles,
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.es2022,
      },
    },
  },
  ...tseslint.configs.recommendedTypeChecked.map((conf) => ({
    ...conf,
    files: ["src/**/*.ts"],
  })),
  {
    name: "repo/src-overrides",
    files: ["src/**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      "@typescript-eslint/no-deprecated": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "prefer-const": "error",
      "no-var": "error",
    },
  },
  // Prettier config to disable conflicting rules (must be last to override other configs)
  prettier,
];
