import tseslint from "typescript-eslint";
import { requestedTypeScriptRules } from "../../../src/base";
import { createTsRuleTester } from "../../helpers/rule-tester";
import { asRuleModule, getRuleOptions } from "../../helpers/test-utils";

// Access the rule from the plugin
const tsPlugin = tseslint.plugin as unknown as { rules: Record<string, unknown> };
const rule = asRuleModule(tsPlugin.rules["consistent-type-imports"]);
const options = getRuleOptions(requestedTypeScriptRules["@typescript-eslint/consistent-type-imports"]);

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
