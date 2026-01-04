import path from "node:path";
import unicornPlugin from "eslint-plugin-unicorn";
import { reactConfig } from "../../src/react";
import { createTsRuleTester, repoRoot } from "../helpers/rule-tester";
import { asRuleModule, getRuleOptions, getRuleSetting } from "../helpers/test-utils";

// Access the rule from the plugin (with null check)
const rules = unicornPlugin.rules;
if (!rules) throw new Error("unicorn plugin has no rules");
const rule = asRuleModule(rules["filename-case"]);

const options = getRuleOptions(getRuleSetting(reactConfig, "unicorn/filename-case"));

const ruleTester = createTsRuleTester({ jsx: true });

ruleTester.run("filename-case", rule, {
  valid: [
    {
      code: "export const x = 1; void x;",
      filename: path.join(repoRoot, "apps/foo-bar.tsx"),
      options,
    },
  ],
  invalid: [
    {
      code: "export const x = 1; void x;",
      filename: path.join(repoRoot, "apps/FooBar.tsx"),
      options,
      errors: [{ messageId: "filename-case" }],
    },
  ],
});
