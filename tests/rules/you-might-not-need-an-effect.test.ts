import reactYouMightNotNeedAnEffect from "eslint-plugin-react-you-might-not-need-an-effect";
import { createTsRuleTester } from "../helpers/rule-tester";
import { asRuleModule } from "../helpers/test-utils";

// Access the rule from the plugin (with null check)
const rules = reactYouMightNotNeedAnEffect.rules;
if (!rules) throw new Error("react-you-might-not-need-an-effect plugin has no rules");
const rule = asRuleModule(rules["no-empty-effect"]);

const ruleTester = createTsRuleTester({ jsx: true });

ruleTester.run("no-empty-effect", rule, {
  valid: [
    {
      code: `
import { useEffect } from "react";
export function Ok() {
  useEffect(() => {
    const id = setTimeout(() => {}, 0);
    return () => clearTimeout(id);
  }, []);
  return null;
}
      `.trim(),
    },
  ],
  invalid: [
    {
      code: `
import { useEffect } from "react";
export function Bad() {
  useEffect(() => {}, []);
  return null;
}
      `.trim(),
      errors: [{ messageId: "avoidEmptyEffect" }],
    },
  ],
});
