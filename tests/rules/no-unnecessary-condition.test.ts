import tseslint from "typescript-eslint";
import { createTsRuleTester } from "../helpers/rule-tester";
import { asRuleModule } from "../helpers/test-utils";

// Access the rule from the plugin
const tsPlugin = tseslint.plugin as unknown as { rules: Record<string, unknown> };
const rule = asRuleModule(tsPlugin.rules["no-unnecessary-condition"]);

const ruleTester = createTsRuleTester({ typeChecked: true });

ruleTester.run("no-unnecessary-condition", rule, {
  valid: [
    {
      code: `
type User = { name?: string };
declare const u: User;
u.name?.toUpperCase();
      `.trim(),
    },
  ],
  invalid: [
    {
      code: `
type User = { name: string };
declare const u: User;
u.name?.toUpperCase();
      `.trim(),
      errors: [
        {
          messageId: "neverOptionalChain",
          suggestions: [
            {
              messageId: "suggestRemoveOptionalChain",
              output: `
type User = { name: string };
declare const u: User;
u.name.toUpperCase();
              `.trim(),
            },
          ],
        },
      ],
    },
  ],
});
