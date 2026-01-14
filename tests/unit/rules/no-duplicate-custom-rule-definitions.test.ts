import { describe, expect, it } from "bun:test";
import { posaune0423 } from "../../../src/factory";

type RuleValue = unknown;

function toComparable(value: RuleValue): string {
  return JSON.stringify(value);
}

describe("Config sanity: avoid duplicate custom rule definitions", () => {
  it("should not define the same ruleId in multiple custom config blocks", () => {
    const configs = posaune0423({ react: true, node: true });

    // Only consider our named configs (we can reason about these).
    // Exclude third-party recommended configs that we spread in.
    const ours = configs.filter((c) => typeof c.name === "string" && c.name.startsWith("@posaune0423/"));

    const definedIn = new Map<string, Array<{ name: string; value: RuleValue }>>();
    for (const c of ours) {
      const rules = c.rules ?? {};
      for (const [ruleId, value] of Object.entries(rules)) {
        const name = c.name as string;
        const arr = definedIn.get(ruleId) ?? [];
        arr.push({ name, value });
        definedIn.set(ruleId, arr);
      }
    }

    const duplicates = [...definedIn.entries()]
      .filter(([, defs]) => defs.length > 1)
      .map(([ruleId, defs]) => ({
        ruleId,
        defs: defs.map((d) => `${d.name}: ${toComparable(d.value)}`),
      }));

    // If this fails, it usually means we configured the same rule twice in different blocks,
    // which often leads to confusing overrides. Consolidate the rule into one place.
    expect(duplicates).toEqual([]);
  });
});
