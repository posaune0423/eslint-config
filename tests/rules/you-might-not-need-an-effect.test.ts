import { expect, test } from "bun:test";
import { configPath, fixturePath, lintFile, parseRuleIds } from "../helpers/lint";

test("react-you-might-not-need-an-effect/no-empty-effect is active", async () => {
  const { exitCode, stdout, stderr } = await lintFile({
    configFile: configPath("react"),
    filePath: fixturePath("react-you-might-not-need-an-effect__empty-effect.tsx"),
  });

  if (exitCode === 2) throw new Error(stderr);
  expect(exitCode === 0 || exitCode === 1).toBe(true);
  expect(parseRuleIds(stdout)).toContain("react-you-might-not-need-an-effect/no-empty-effect");
});
