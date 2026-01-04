import { expect, test } from "bun:test";
import { configPath, fixturePath, lintFile, parseRuleIds } from "../helpers/lint";

test("unicorn/filename-case enforces kebab-case filenames", async () => {
  const { exitCode, stdout, stderr } = await lintFile({
    configFile: configPath("react"),
    filePath: fixturePath("react-unicorn-filename-case__FooBar.tsx"),
  });

  if (exitCode === 2) throw new Error(stderr);
  expect(exitCode === 0 || exitCode === 1).toBe(true);
  expect(parseRuleIds(stdout)).toContain("unicorn/filename-case");
});
