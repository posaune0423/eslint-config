import { expect, test } from "bun:test";
import { configPath, fixturePath, lintFile, parseRuleIds } from "../helpers/lint";

test("@typescript-eslint/no-deprecated is enabled (warn)", async () => {
  const { exitCode, stdout, stderr } = await lintFile({
    configFile: configPath("base"),
    filePath: fixturePath("ts-no-deprecated__deprecated-usage.ts"),
  });

  if (exitCode === 2) throw new Error(stderr);
  expect(exitCode === 0 || exitCode === 1).toBe(true);
  expect(parseRuleIds(stdout)).toContain("@typescript-eslint/no-deprecated");
});
