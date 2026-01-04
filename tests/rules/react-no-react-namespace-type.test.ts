import { expect, test } from "bun:test";
import { configPath, fixturePath, lintFile, parseRuleIds } from "../helpers/lint";

test('React namespace types are rejected (prefer `import type { ChangeEvent } from "react"`)', async () => {
  const { exitCode, stdout, stderr } = await lintFile({
    configFile: configPath("react"),
    filePath: fixturePath("react-no-react-namespace-type__react-change-event.tsx"),
  });

  if (exitCode === 2) throw new Error(stderr);
  expect(exitCode === 0 || exitCode === 1).toBe(true);
  expect(parseRuleIds(stdout)).toContain("no-restricted-syntax");
});
