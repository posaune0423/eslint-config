import nodePlugin from "eslint-plugin-n";
import type { Linter } from "eslint";

/**
 * Node.js config: eslint-plugin-n recommended rules.
 * Uses flat/recommended which considers both CJS and ESM based on package.json type field.
 */
export function nodeConfig(): Linter.Config[] {
  return [nodePlugin.configs["flat/recommended"]];
}
