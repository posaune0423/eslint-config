import tseslint from "typescript-eslint";
import { createTsRuleTester } from "../../helpers/rule-tester";
import { asRuleModule } from "../../helpers/test-utils";

// Access the rule from the plugin
const tsPlugin = tseslint.plugin as unknown as { rules: Record<string, unknown> };
const rule = asRuleModule(tsPlugin.rules["no-explicit-any"]);

const ruleTester = createTsRuleTester();

ruleTester.run("no-explicit-any", rule, {
  valid: [
    {
      code: "const x: unknown = 1; void x;",
    },
  ],
  invalid: [
    {
      code: "const x: any = 1; void x;",
      errors: [
        {
          messageId: "unexpectedAny",
          suggestions: [
            {
              messageId: "suggestUnknown",
              output: "const x: unknown = 1; void x;",
            },
            {
              messageId: "suggestNever",
              output: "const x: never = 1; void x;",
            },
          ],
        },
      ],
    },
  ],
});
