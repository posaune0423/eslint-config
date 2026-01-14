import { describe, expect, it } from "bun:test";
import { configPath, fixturePath, printConfig } from "../../helpers/integration-utils";
import { isRecord } from "../../helpers/test-utils";

function isUnknownArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

function actualSeverity(printed: unknown): number | undefined {
  if (!isUnknownArray(printed)) return undefined;
  const first = printed[0];
  return typeof first === "number" ? first : undefined;
}

describe("Node config (posaune({ node: true })) - print-config coverage", () => {
  const config = configPath("node");

  it("should include eslint-plugin-n recommended rules in resolved config for JS files", async () => {
    const { exitCode, stdout, stderr } = await printConfig({
      configFile: config,
      filePath: fixturePath("node-fixture.mjs"),
    });

    expect(exitCode).toBe(0);
    expect(stderr).toBe("");

    const parsed = JSON.parse(stdout) as unknown;
    if (!isRecord(parsed)) {
      throw new Error("Expected printed config to be an object.");
    }

    const rulesValue = parsed.rules;
    const rules = isRecord(rulesValue) ? rulesValue : {};

    // Spot-check a few stable rules from `eslint-plugin-n` flat/recommended.
    expect(actualSeverity(rules["n/no-missing-import"])).toBe(2);
    expect(actualSeverity(rules["n/no-extraneous-import"])).toBe(2);
    expect(actualSeverity(rules["n/no-unsupported-features/es-syntax"])).toBe(2);
  });
});
