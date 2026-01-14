import pluginSecurity from "eslint-plugin-security";
import type { Linter } from "eslint";

/**
 * Security config: eslint-plugin-security recommended rules.
 * Enabled by default to catch common security issues.
 */
export function securityConfig(): Linter.Config[] {
  return [pluginSecurity.configs.recommended];
}
