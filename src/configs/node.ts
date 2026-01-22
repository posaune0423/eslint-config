import nodePlugin from "eslint-plugin-n";
import type { Linter } from "eslint";

/**
 * Node.js config: eslint-plugin-n recommended rules.
 * Uses flat/recommended which considers both CJS and ESM based on package.json type field.
 */
export function nodeConfig(): Linter.Config[] {
  return [
    nodePlugin.configs["flat/recommended"],
    {
      files: ["**/scripts/**/*.{ts,tsx,mts,cts,js,jsx,mjs,cjs}", "**/bin/**/*.{ts,tsx,mts,cts,js,jsx,mjs,cjs}"],
      rules: {
        "no-process-exit": "off",
        "n/no-process-exit": "off",
      },
    },
  ];
}
