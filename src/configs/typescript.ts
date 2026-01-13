import tseslint from "typescript-eslint";
import type { Linter } from "eslint";

/**
 * TypeScript config: strict type-checked rules + custom rules.
 */
export function typescriptConfig(): Linter.Config[] {
  return [
    ...(tseslint.configs.strictTypeChecked as Linter.Config[]),
    {
      name: "@posaune0423/typescript",
      rules: {
        // Warn on deprecated APIs (requires type-aware linting)
        "@typescript-eslint/no-deprecated": "warn",

        // Disallow the `any` type - enforce proper typing
        "@typescript-eslint/no-explicit-any": "error",

        // Disallow unnecessary conditions (includes unnecessary optional chaining)
        "@typescript-eslint/no-unnecessary-condition": "error",

        // Enforce `import type { Foo } from "..."` for type-only imports
        "@typescript-eslint/consistent-type-imports": [
          "error",
          {
            prefer: "type-imports",
            fixStyle: "separate-type-imports",
          },
        ],
      },
    },
  ];
}
