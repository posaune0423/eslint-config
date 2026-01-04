import { describe, expect, it } from "bun:test";
import { configPath, fixturePath, lintFile, parseRuleIds } from "../../helpers/integration-utils";

describe("React rules (reactConfig)", () => {
  const config = configPath("react");

  it("should trigger unicorn/filename-case for PascalCase filename", async () => {
    const { stdout } = await lintFile({
      configFile: config,
      filePath: fixturePath("FooBar.tsx"),
    });
    const ruleIds = parseRuleIds(stdout);

    expect(ruleIds).toContain("unicorn/filename-case");
  });

  it("should trigger no-restricted-syntax for React.* namespace types", async () => {
    const { stdout } = await lintFile({
      configFile: config,
      filePath: fixturePath("react-namespace-type.tsx"),
    });
    const ruleIds = parseRuleIds(stdout);

    expect(ruleIds).toContain("no-restricted-syntax");
  });

  it("should trigger react-you-might-not-need-an-effect/no-empty-effect", async () => {
    const { stdout } = await lintFile({
      configFile: config,
      filePath: fixturePath("empty-effect.tsx"),
    });
    const ruleIds = parseRuleIds(stdout);

    expect(ruleIds).toContain("react-you-might-not-need-an-effect/no-empty-effect");
  });

  it("should NOT trigger react/react-in-jsx-scope or react/jsx-uses-react (new JSX transform)", async () => {
    const { stdout } = await lintFile({
      configFile: config,
      filePath: fixturePath("jsx-transform.tsx"),
    });
    const ruleIds = parseRuleIds(stdout);

    expect(ruleIds).not.toContain("react/react-in-jsx-scope");
    expect(ruleIds).not.toContain("react/jsx-uses-react");
  });

  it("should trigger react-hooks/rules-of-hooks for conditional hook call", async () => {
    const { stdout } = await lintFile({
      configFile: config,
      filePath: fixturePath("rules-of-hooks.tsx"),
    });
    const ruleIds = parseRuleIds(stdout);

    expect(ruleIds).toContain("react-hooks/rules-of-hooks");
  });

  it("should trigger react-hooks/exhaustive-deps for missing dependency", async () => {
    const { stdout } = await lintFile({
      configFile: config,
      filePath: fixturePath("exhaustive-deps.tsx"),
    });
    const ruleIds = parseRuleIds(stdout);

    expect(ruleIds).toContain("react-hooks/exhaustive-deps");
  });

  it("should trigger react-you-might-not-need-an-effect/no-initialize-state", async () => {
    const { stdout } = await lintFile({
      configFile: config,
      filePath: fixturePath("no-initialize-state.tsx"),
    });
    const ruleIds = parseRuleIds(stdout);

    expect(ruleIds).toContain("react-you-might-not-need-an-effect/no-initialize-state");
  });
});
