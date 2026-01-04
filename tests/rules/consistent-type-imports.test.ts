import { expect, test } from "bun:test";
import { configPath, fixturePath, lintFile, parseRuleIds } from "../helpers/lint";

test("@typescript-eslint/consistent-type-imports enforces `import type`", async () => {
  const { exitCode, stdout, stderr } = await lintFile({
    configFile: configPath("base"),
    filePath: fixturePath("ts-consistent-type-imports__value-import-used-as-type.ts"),
  });

  if (exitCode === 2) throw new Error(stderr);
  expect(exitCode === 0 || exitCode === 1).toBe(true);
  expect(parseRuleIds(stdout)).toContain("@typescript-eslint/consistent-type-imports");
});
