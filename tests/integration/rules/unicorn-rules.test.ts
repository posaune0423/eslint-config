import { describe, expect, it } from "bun:test";
import { configPath, fixturePath, lintFile, parseRuleIds } from "../../helpers/integration-utils";

describe("Unicorn rules (unicornConfig)", () => {
  const config = configPath("base");

  it("should trigger selected unicorn rules", async () => {
    const { stdout } = await lintFile({
      configFile: config,
      filePath: fixturePath("unicorn-rules.ts"),
    });
    const ruleIds = parseRuleIds(stdout);

    expect(ruleIds).toContain("unicorn/consistent-empty-array-spread");
    expect(ruleIds).toContain("unicorn/error-message");
    expect(ruleIds).toContain("unicorn/escape-case");
    expect(ruleIds).toContain("unicorn/new-for-builtins");
    expect(ruleIds).toContain("unicorn/no-instanceof-builtins");
    expect(ruleIds).toContain("unicorn/no-new-array");
    expect(ruleIds).toContain("unicorn/no-new-buffer");
    expect(ruleIds).toContain("unicorn/number-literal-case");
    expect(ruleIds).toContain("unicorn/prefer-dom-node-text-content");
    expect(ruleIds).toContain("unicorn/prefer-includes");
    expect(ruleIds).toContain("unicorn/prefer-node-protocol");
    expect(ruleIds).toContain("unicorn/prefer-number-properties");
    expect(ruleIds).toContain("unicorn/prefer-string-starts-ends-with");
    expect(ruleIds).toContain("unicorn/prefer-type-error");
    expect(ruleIds).toContain("unicorn/throw-new-error");
  });
});
