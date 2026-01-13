import tseslint from "typescript-eslint";
import posaune from "../../../src";
import { createTsRuleTester } from "../../helpers/rule-tester";
import { asRuleModule, getRuleOptions, getRuleSetting } from "../../helpers/test-utils";

// Access the rule from the plugin
const tsPlugin = tseslint.plugin as unknown as { rules: Record<string, unknown> };
const rule = asRuleModule(tsPlugin.rules["consistent-type-imports"]);

// Get the rule options from our config
const config = posaune();
const options = getRuleOptions(getRuleSetting(config, "@typescript-eslint/consistent-type-imports"));

const ruleTester = createTsRuleTester();

ruleTester.run("consistent-type-imports", rule, {
  valid: [
    {
      // Using `import type` is valid under the configured options.
      code: `import type { Foo } from "foo"; export type Bar = Foo;`,
      options,
    },
  ],
  invalid: [
    {
      // Value import for a type-only use is invalid.
      code: `import { Foo } from "foo"; export type Bar = Foo;`,
      options,
      errors: [{ messageId: "typeOverValue" }],
      output: `import type { Foo } from "foo"; export type Bar = Foo;`,
    },
  ],
});
