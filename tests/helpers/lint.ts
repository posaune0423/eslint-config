import path from "node:path";

export const repoRoot = path.resolve(import.meta.dir, "..", "..");
const eslintBin = path.join(repoRoot, "node_modules", "eslint", "bin", "eslint.js");

export function configPath(name: "base" | "node" | "react"): string {
  return path.join(repoRoot, "tests", "helpers", `eslint.config.${name}.ts`);
}

export function fixturePath(fileName: string): string {
  return path.join(repoRoot, "tests", "fixtures", fileName);
}

export async function lintFile({ configFile, filePath }: { configFile: string; filePath: string }) {
  const proc = Bun.spawn({
    cmd: ["bun", eslintBin, "--no-ignore", "--format", "json", "--config", configFile, filePath],
    cwd: repoRoot,
    stdout: "pipe",
    stderr: "pipe",
  });

  const [exitCode, stdout, stderr] = await Promise.all([
    proc.exited,
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ]);

  return { exitCode, stdout, stderr };
}

export function parseRuleIds(stdout: string): string[] {
  const results = JSON.parse(stdout) as Array<{ messages: Array<{ ruleId: string | null }> }>;
  const result = results[0];
  if (!result) return [];
  return result.messages.map((m) => m.ruleId).filter((x): x is string => typeof x === "string");
}
