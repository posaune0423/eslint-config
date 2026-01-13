import type { Linter } from "eslint";
import type { Options } from "./types";
import { eslintConfig, typescriptConfig, securityConfig, nodeConfig, reactConfig } from "./configs";

/**
 * Create an ESLint flat config with sensible defaults.
 *
 * @param options - Configuration options to enable/disable features
 * @param customConfigs - Additional configs to append (for project-specific overrides)
 * @returns A flat config array ready to export from eslint.config.ts
 *
 * @example
 * // Basic TypeScript project
 * export default posaune()
 *
 * @example
 * // React project
 * export default posaune({ react: true })
 *
 * @example
 * // Node.js project
 * export default posaune({ node: true })
 *
 * @example
 * // With project-specific overrides
 * export default posaune(
 *   { react: true },
 *   { rules: { "security/detect-object-injection": "off" } },
 *   { files: ["**\/*.test.ts"], rules: { "@typescript-eslint/no-explicit-any": "off" } },
 * )
 */
export function posaune0423(options: Options = {}, ...customConfigs: Linter.Config[]): Linter.Config[] {
  const { typescript = true, react = false, node = false } = options;

  const result: Linter.Config[] = [];

  // Base: ESLint recommended (always included)
  result.push(...eslintConfig());

  // Security: eslint-plugin-security (always included by default)
  result.push(...securityConfig());

  // TypeScript: strictTypeChecked + custom rules (default: true)
  if (typescript) {
    result.push(...typescriptConfig());
  }

  // Node.js: eslint-plugin-n (optional)
  if (node) {
    result.push(...nodeConfig());
  }

  // React: @eslint-react + hooks + custom rules (optional)
  if (react) {
    result.push(...reactConfig());
  }

  // Append user's custom configs at the end (allows overrides)
  result.push(...customConfigs);

  return result;
}
