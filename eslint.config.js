import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

const jsLikeFiles = ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"];
const tsLikeFiles = ["**/*.{ts,mts,cts,tsx}"];

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
      "tests/fixtures/**",
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
  {
    name: "repo/typescript-typechecked",
    files: tsLikeFiles,
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  ...tseslint.configs.recommendedTypeChecked.map((conf) => ({
    ...conf,
    files: tsLikeFiles,
  })),
  {
    name: "repo/requested-rules",
    files: tsLikeFiles,
    rules: {
      "@typescript-eslint/no-deprecated": "warn",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
        },
      ],
    },
  },
  // Prettier config to disable conflicting rules (must be last to override other configs)
  prettier,
];
