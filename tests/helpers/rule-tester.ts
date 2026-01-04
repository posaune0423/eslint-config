import path from "node:path";
import { describe, it } from "bun:test";
import { RuleTester } from "@typescript-eslint/rule-tester";
import tseslint from "typescript-eslint";

export const repoRoot = path.resolve(import.meta.dir, "..", "..");

// Wire ESLint RuleTester to Bun's test functions.
RuleTester.describe = describe;
RuleTester.it = it;

export function createTsRuleTester({
  jsx = false,
  typeChecked = false,
}: {
  jsx?: boolean;
  typeChecked?: boolean;
} = {}): RuleTester {
  return new RuleTester({
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: jsx ? { jsx: true } : {},
        ...(typeChecked
          ? {
              projectService: {
                // Enable type-aware linting for all test files.
                allowDefaultProject: ["*.ts*"],
              },
              tsconfigRootDir: repoRoot,
            }
          : {}),
      },
    },
  });
}
