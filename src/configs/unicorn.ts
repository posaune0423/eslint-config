import unicornPlugin from "eslint-plugin-unicorn";
import type { Linter } from "eslint";

/**
 * Unicorn config: selected eslint-plugin-unicorn rules.
 */
export function unicornConfig(): Linter.Config[] {
  return [
    {
      name: "@posaune0423/unicorn",
      files: ["**/*.{js,jsx,ts,tsx,mjs,cjs}"],
      plugins: {
        unicorn: unicornPlugin,
      },
      rules: {
        "unicorn/consistent-empty-array-spread": "error",
        "unicorn/error-message": "error",
        "unicorn/escape-case": "error",
        "unicorn/new-for-builtins": "error",
        "unicorn/no-instanceof-builtins": "error",
        "unicorn/no-new-array": "error",
        "unicorn/no-new-buffer": "error",
        "unicorn/number-literal-case": "error",
        "unicorn/prefer-dom-node-text-content": "error",
        "unicorn/prefer-includes": "error",
        "unicorn/prefer-node-protocol": "error",
        "unicorn/prefer-number-properties": "error",
        "unicorn/prefer-string-starts-ends-with": "error",
        "unicorn/prefer-type-error": "error",
        "unicorn/throw-new-error": "error",
      },
    },
  ];
}
