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
});
