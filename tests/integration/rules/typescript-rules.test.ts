import { describe, expect, it } from "bun:test";
import { configPath, fixturePath, lintFile, parseRuleIds } from "../../helpers/integration-utils";

describe("TypeScript rules (baseConfig)", () => {
  const config = configPath("base");

  it("should trigger @typescript-eslint/no-explicit-any", async () => {
    const { stdout } = await lintFile({
      configFile: config,
      filePath: fixturePath("no-explicit-any.ts"),
    });
    const ruleIds = parseRuleIds(stdout);

    expect(ruleIds).toContain("@typescript-eslint/no-explicit-any");
  });

  it("should trigger @typescript-eslint/no-unnecessary-condition", async () => {
    const { stdout } = await lintFile({
      configFile: config,
      filePath: fixturePath("no-unnecessary-condition.ts"),
    });
    const ruleIds = parseRuleIds(stdout);

    expect(ruleIds).toContain("@typescript-eslint/no-unnecessary-condition");
  });

  it("should trigger @typescript-eslint/no-deprecated", async () => {
    const { stdout } = await lintFile({
      configFile: config,
      filePath: fixturePath("no-deprecated.ts"),
    });
    const ruleIds = parseRuleIds(stdout);

    expect(ruleIds).toContain("@typescript-eslint/no-deprecated");
  });

  it("should trigger @typescript-eslint/consistent-type-imports", async () => {
    const { stdout } = await lintFile({
      configFile: config,
      filePath: fixturePath("consistent-type-imports.ts"),
    });
    const ruleIds = parseRuleIds(stdout);

    expect(ruleIds).toContain("@typescript-eslint/consistent-type-imports");
  });

  it("should trigger additional TypeScript rules configured by this package", async () => {
    const { stdout } = await lintFile({
      configFile: config,
      filePath: fixturePath("typescript-additional-rules.ts"),
    });
    const ruleIds = parseRuleIds(stdout);

    expect(ruleIds).toContain("@typescript-eslint/await-thenable");
    expect(ruleIds).toContain("@typescript-eslint/ban-ts-comment");
    expect(ruleIds).toContain("@typescript-eslint/dot-notation");
    expect(ruleIds).toContain("@typescript-eslint/method-signature-style");
    expect(ruleIds).toContain("@typescript-eslint/no-empty-object-type");
    expect(ruleIds).toContain("@typescript-eslint/no-floating-promises");
    expect(ruleIds).toContain("@typescript-eslint/no-for-in-array");
    expect(ruleIds).toContain("@typescript-eslint/no-implied-eval");
    expect(ruleIds).toContain("@typescript-eslint/no-misused-promises");
    expect(ruleIds).toContain("@typescript-eslint/no-unnecessary-type-assertion");
    expect(ruleIds).toContain("@typescript-eslint/no-wrapper-object-types");
    expect(ruleIds).toContain("@typescript-eslint/promise-function-async");
    expect(ruleIds).toContain("@typescript-eslint/restrict-plus-operands");
    expect(ruleIds).toContain("@typescript-eslint/restrict-template-expressions");
    expect(ruleIds).toContain("@typescript-eslint/return-await");
    expect(ruleIds).toContain("@typescript-eslint/strict-boolean-expressions");
    expect(ruleIds).toContain("@typescript-eslint/switch-exhaustiveness-check");
    expect(ruleIds).toContain("@typescript-eslint/unbound-method");
  });
});
