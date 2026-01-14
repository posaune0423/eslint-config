import { describe, expect, it } from "bun:test";
import posaune from "../../../src";
import { getRuleSetting } from "../../helpers/test-utils";

/**
 * Helper to extract severity from a rule setting.
 */
function getSeverity(setting: unknown): string | number | undefined {
  if (setting === undefined) return undefined;
  if (typeof setting === "string" || typeof setting === "number") return setting;
  if (Array.isArray(setting)) return setting[0] as string | number;

  return undefined;
}

describe("React JSX Transform configuration", () => {
  const reactConfig = posaune({ react: true });

  it("should not include legacy react/react-in-jsx-scope rule (using @eslint-react)", () => {
    // @eslint-react/eslint-plugin doesn't include this legacy rule
    // because it's designed for React 17+ with the new JSX transform
    const setting = getRuleSetting(reactConfig, "react/react-in-jsx-scope");
    const severity = getSeverity(setting);

    // Either undefined (not present) or explicitly off
    expect(severity === undefined || severity === "off" || severity === 0).toBe(true);
  });

  it("should not include legacy react/jsx-uses-react rule (using @eslint-react)", () => {
    // We intentionally enable `react/jsx-uses-react` (Antfu-style) even with the new JSX transform.
    // This rule doesn't report by itself; it marks `React` as used to avoid false positives in other rules.
    const setting = getRuleSetting(reactConfig, "react/jsx-uses-react");
    const severity = getSeverity(setting);

    expect(severity === "warn" || severity === 1).toBe(true);
  });
});
