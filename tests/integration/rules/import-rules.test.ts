import { describe, expect, it } from "bun:test";
import { configPath, fixturePath, lintFile, parseRuleIds } from "../../helpers/integration-utils";

describe("Import rules (importConfig)", () => {
  const config = configPath("base");

  it("should trigger selected import/* rules", async () => {
    const { stdout } = await lintFile({
      configFile: config,
      filePath: fixturePath("import-rules.ts"),
    });
    const ruleIds = parseRuleIds(stdout);

    expect(ruleIds).toContain("import/first");
    expect(ruleIds).toContain("import/consistent-type-specifier-style");
    expect(ruleIds).toContain("import/no-duplicates");
    expect(ruleIds).toContain("import/no-mutable-exports");
  });
});
