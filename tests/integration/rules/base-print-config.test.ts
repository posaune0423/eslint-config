import { describe, expect, it } from "bun:test";
import { typescriptConfig } from "../../../src/configs/typescript";
import { unicornConfig } from "../../../src/configs/unicorn";
import { configPath, fixturePath, printConfig } from "../../helpers/integration-utils";
import { isRecord } from "../../helpers/test-utils";

function expectedSeverity(ruleConfig: unknown): number | undefined {
  if (ruleConfig === "off") return 0;
  if (ruleConfig === "warn") return 1;
  if (ruleConfig === "error") return 2;

  if (Array.isArray(ruleConfig)) {
    return expectedSeverity(ruleConfig[0]);
  }

  return undefined;
}

function isUnknownArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

function actualSeverity(printed: unknown): number | undefined {
  if (!isUnknownArray(printed)) return undefined;
  const first = printed[0];
  return typeof first === "number" ? first : undefined;
}

describe("Base config (posaune()) - print-config coverage", () => {
  const config = configPath("base");

  it("should include unicorn + typescript custom rules (and security) in resolved config", async () => {
    const { exitCode, stdout, stderr } = await printConfig({
      configFile: config,
      filePath: fixturePath("no-explicit-any.ts"),
    });

    expect(exitCode).toBe(0);
    expect(stderr).toBe("");

    const parsed = JSON.parse(stdout) as unknown;
    if (!isRecord(parsed)) {
      throw new Error("Expected printed config to be an object.");
    }

    const rulesValue = parsed.rules;
    const rules = isRecord(rulesValue) ? rulesValue : {};

    // Security config is always included by default.
    expect(actualSeverity(rules["security/detect-object-injection"])).toBe(1);

    // Unicorn config is always included by default.
    const unicornRules = unicornConfig()[0]?.rules ?? {};
    for (const [ruleId, cfg] of Object.entries(unicornRules)) {
      expect(rules[ruleId]).toBeDefined();
      const expected = expectedSeverity(cfg);
      if (expected != null) expect(actualSeverity(rules[ruleId])).toBe(expected);
    }

    // TypeScript custom rules are included by default.
    const tsCustom = typescriptConfig().find((c) => c.name === "@posaune0423/typescript");
    const tsRules = tsCustom?.rules ?? {};
    for (const [ruleId, cfg] of Object.entries(tsRules)) {
      expect(rules[ruleId]).toBeDefined();
      const expected = expectedSeverity(cfg);
      if (expected != null) expect(actualSeverity(rules[ruleId])).toBe(expected);
    }
  });
});
