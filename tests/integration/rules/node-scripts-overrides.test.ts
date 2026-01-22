import { describe, expect, it } from "bun:test";
import { configPath, fixturePath, lintFile, repoRoot } from "../../helpers/integration-utils";
import path from "node:path";

describe("Node config (posaune({ node: true })) - scripts/bin overrides", () => {
  const config = configPath("node");

  it("should trigger n/no-process-exit for non-scripts files", async () => {
    const { stdout } = await lintFile({
      configFile: config,
      filePath: fixturePath("node-process-exit.mjs"),
    });

    const results = JSON.parse(stdout) as Array<{ messages: Array<{ ruleId: string | null }> }>;
    const ruleIds = results[0]?.messages.map((m) => m.ruleId).filter((x): x is string => typeof x === "string") ?? [];

    expect(ruleIds).toContain("n/no-process-exit");
  });

  it("should not apply n/no-process-exit (nor core no-process-exit) to scripts/** and bin/**", async () => {
    const scriptPath = path.join(repoRoot, "tests", "scripts", "process-exit.mjs");
    const binPath = path.join(repoRoot, "tests", "bin", "process-exit.mjs");

    const [{ stdout: scriptStdout }, { stdout: binStdout }] = await Promise.all([
      lintFile({ configFile: config, filePath: scriptPath }),
      lintFile({ configFile: config, filePath: binPath }),
    ]);

    const parse = (out: string) => {
      const results = JSON.parse(out) as Array<{ messages: Array<{ ruleId: string | null }> }>;
      return results[0]?.messages.map((m) => m.ruleId).filter((x): x is string => typeof x === "string") ?? [];
    };

    const scriptRuleIds = parse(scriptStdout);
    const binRuleIds = parse(binStdout);

    expect(scriptRuleIds).not.toContain("n/no-process-exit");
    expect(scriptRuleIds).not.toContain("no-process-exit");
    expect(binRuleIds).not.toContain("n/no-process-exit");
    expect(binRuleIds).not.toContain("no-process-exit");
  });
});

