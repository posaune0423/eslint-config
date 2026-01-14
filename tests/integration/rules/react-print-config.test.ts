import { describe, expect, it } from "bun:test";
import { reactConfig } from "../../../src/configs/react";
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

describe("React config (posaune({ react: true })) - print-config coverage", () => {
  const config = configPath("react");

  it("should include all explicitly configured React-related rules in resolved config", async () => {
    const { exitCode, stdout, stderr } = await printConfig({
      configFile: config,
      filePath: fixturePath("FooBar.tsx"),
    });

    expect(exitCode).toBe(0);
    expect(stderr).toBe("");

    const parsed = JSON.parse(stdout) as unknown;
    if (!isRecord(parsed)) {
      throw new Error("Expected printed config to be an object.");
    }

    const rulesValue = parsed.rules;
    const rules = isRecord(rulesValue) ? rulesValue : {};

    const custom = reactConfig().find((c) => c.name === "@posaune0423/react");
    expect(custom).toBeTruthy();

    const expectedRules = custom?.rules ?? {};
    for (const [ruleId, cfg] of Object.entries(expectedRules)) {
      expect(rules[ruleId]).toBeDefined();

      const expected = expectedSeverity(cfg);
      if (expected != null) expect(actualSeverity(rules[ruleId])).toBe(expected);
    }
  });
});
