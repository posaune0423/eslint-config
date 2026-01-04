import { baseConfig } from "@posaune0423/eslint-config";
import type { Linter } from "eslint";

/**
 * Repo-local ESLint config.
 *
 * This package exports shareable FlatConfig presets from TypeScript files.
 * ESLint itself loads `eslint.config.ts`, so we keep the repo config in TS.
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
  ...baseConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
] as Linter.Config[];
