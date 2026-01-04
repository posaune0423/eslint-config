import { expect, test } from "bun:test";
import { configPath, fixturePath, lintFile, parseRuleIds } from "../helpers/lint";

test("react/react-in-jsx-scope and react/jsx-uses-react are disabled", async () => {
  const { exitCode, stdout, stderr } = await lintFile({
    configFile: configPath("react"),
    filePath: fixturePath("react-jsx-transform__no-react-import.tsx"),
  });

  if (exitCode === 2) throw new Error(stderr);
  expect(exitCode === 0 || exitCode === 1).toBe(true);

  const ids = parseRuleIds(stdout);
  expect(ids).not.toContain("react/react-in-jsx-scope");
  expect(ids).not.toContain("react/jsx-uses-react");
});
