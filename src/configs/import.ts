import importPlugin from "eslint-plugin-import";
import type { Linter } from "eslint";

/**
 * Import config: eslint-plugin-import rules.
 */
export function importConfig(): Linter.Config[] {
  return [
    {
      name: "@posaune0423/import",
      files: ["**/*.{js,jsx,ts,tsx,mjs,cjs}"],
      plugins: {
        import: importPlugin,
      },
      settings: {
        // Enable TypeScript-aware module resolution for rules that inspect other modules.
        "import/resolver": {
          typescript: true,
          node: true,
        },
      },
      rules: {
        // Avoid duplicate reports with the core rule when using eslint-plugin-import.
        "no-duplicate-imports": "off",

        // Use `import type { Foo } from "..."` rather than inline `import { type Foo } from "..."`
        "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
        "import/first": "error",
        "import/no-duplicates": "error",
        "import/no-mutable-exports": "error",
        "import/no-named-default": "error",
      },
    },
  ];
}
