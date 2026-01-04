import tseslint from "typescript-eslint";
import { createTsRuleTester } from "../helpers/rule-tester";
import { asRuleModule } from "../helpers/test-utils";

// Access the rule from the plugin
const tsPlugin = tseslint.plugin as unknown as { rules: Record<string, unknown> };
const rule = asRuleModule(tsPlugin.rules["no-deprecated"]);

const ruleTester = createTsRuleTester({ typeChecked: true });

ruleTester.run("no-deprecated", rule, {
  valid: [
    {
      code: `
function greet(name: string) {
  return "Hello, " + name;
}
greet("World");
      `.trim(),
    },
  ],
  invalid: [
    {
      code: `
/** @deprecated Use newGreet instead */
function greet(name: string) {
  return "Hello, " + name;
}
greet("World");
      `.trim(),
      errors: [{ messageId: "deprecatedWithReason" }],
    },
  ],
});
