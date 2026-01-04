import { expect, test } from "bun:test";
import { configPath, fixturePath, lintFile, parseRuleIds } from "../helpers/lint";

test("@typescript-eslint/no-explicit-any is enabled (error)", async () => {
  const { exitCode, stdout, stderr } = await lintFile({
    configFile: configPath("base"),
    filePath: fixturePath("ts-no-explicit-any__explicit-any.ts"),
  });

  if (exitCode === 2) throw new Error(stderr);
  expect(exitCode === 0 || exitCode === 1).toBe(true);
  expect(parseRuleIds(stdout)).toContain("@typescript-eslint/no-explicit-any");
});
