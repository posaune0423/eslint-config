import type { TSESLint, TSESTree } from "@typescript-eslint/utils";
import { reactConfig } from "../../src/react";
import { createTsRuleTester } from "../helpers/rule-tester";
import { getRuleSetting } from "../helpers/test-utils";

type MessageIds = "misconfigured";
type Options = [];

/**
 * Helper to extract severity from a rule setting.
 */
function getSeverity(setting: unknown): string | number | undefined {
  if (setting === undefined) return undefined;
  if (typeof setting === "string" || typeof setting === "number") return setting;
  if (Array.isArray(setting)) return setting[0] as string | number;

  return undefined;
}

/**
 * Custom rule that asserts react/react-in-jsx-scope and react/jsx-uses-react are disabled.
 * This verifies the project's React config uses the new JSX transform.
 */
const assertReactJsxTransformOffRule: TSESLint.RuleModule<MessageIds, Options> = {
  defaultOptions: [],
  meta: {
    type: "problem",
    schema: [],
    messages: {
      misconfigured:
        "react/react-in-jsx-scope and react/jsx-uses-react must be disabled for the new JSX transform.",
    },
  },
  create(context) {
    const inJsxScope = getSeverity(getRuleSetting(reactConfig, "react/react-in-jsx-scope"));
    const jsxUsesReact = getSeverity(getRuleSetting(reactConfig, "react/jsx-uses-react"));

    const ok = (inJsxScope === "off" || inJsxScope === 0) && (jsxUsesReact === "off" || jsxUsesReact === 0);

    return {
      Program(node: TSESTree.Program) {
        if (!ok) {
          context.report({ node, messageId: "misconfigured" });
        }
      },
    };
  },
};

const ruleTester = createTsRuleTester({ jsx: true });

ruleTester.run("assert-react-jsx-transform-off", assertReactJsxTransformOffRule, {
  valid: [{ code: "export const x = 1; void x;" }],
  invalid: [],
});
