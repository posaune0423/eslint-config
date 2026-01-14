import type { TSESLint } from "@typescript-eslint/utils";
import type { Linter } from "eslint";

/**
 * Type guard for Record<string, unknown>.
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/**
 * Finds a plugin instance from a flat config array.
 */
export function getPluginFromConfig(configArray: readonly unknown[], pluginName: string): unknown {
  for (const cfg of configArray) {
    if (!isRecord(cfg)) continue;
    const plugins = cfg.plugins;
    if (!isRecord(plugins)) continue;
    if (plugins[pluginName] !== undefined) return plugins[pluginName];
  }

  throw new Error(`Plugin "${pluginName}" was not found in the provided config array.`);
}

/**
 * Finds a rule definition from a plugin object.
 */
export function getRuleFromPlugin(plugin: unknown, ruleName: string): unknown {
  if (!isRecord(plugin)) {
    throw new TypeError(`Expected plugin object to be a record, got: ${typeof plugin}`);
  }

  const rules = plugin.rules;
  if (!isRecord(rules)) {
    throw new TypeError(`Expected plugin.rules to be a record, got: ${typeof rules}`);
  }

  const rule = rules[ruleName];
  if (rule === undefined) {
    throw new Error(`Rule "${ruleName}" was not found on the plugin object.`);
  }

  return rule;
}

/**
 * Type assertion to cast a rule object to TSESLint.RuleModule.
 */
export function asRuleModule(rule: unknown): TSESLint.RuleModule<string, unknown[]> {
  if (!isRecord(rule)) throw new TypeError("Expected rule to be an object.");
  if (!("meta" in rule)) throw new TypeError("Expected rule.meta to exist.");
  if (typeof (rule as { create?: unknown }).create !== "function") {
    throw new TypeError("Expected rule.create to be a function.");
  }

  return rule as unknown as TSESLint.RuleModule<string, unknown[]>;
}

/**
 * Extracts the rule setting (severity + options) for a given rule name from a config array.
 */
export function getRuleSetting(configArray: readonly unknown[], ruleName: string): Linter.RuleEntry | undefined {
  for (let i = configArray.length - 1; i >= 0; i--) {
    const cfg = configArray[i];
    if (!isRecord(cfg)) continue;

    const rules = cfg.rules;
    if (!isRecord(rules)) continue;
    if (ruleName in rules) {
      return rules[ruleName] as Linter.RuleEntry;
    }
  }

  return undefined;
}

/**
 * Extracts the options array from a rule setting.
 */
export function getRuleOptions(setting: Linter.RuleEntry | undefined): unknown[] {
  if (setting === undefined) return [];
  if (Array.isArray(setting)) {
    return setting.slice(1);
  }

  return [];
}
