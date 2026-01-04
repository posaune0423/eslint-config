import type { TSESLint } from "@typescript-eslint/utils";
import { builtinRules } from "eslint/use-at-your-own-risk";
import { reactConfig } from "../../src/react";
import { createTsRuleTester } from "../helpers/rule-tester";
import { getRuleOptions, getRuleSetting } from "../helpers/test-utils";

const rule = builtinRules.get("no-restricted-syntax");
if (!rule) throw new Error("Failed to load core rule: no-restricted-syntax");

const options = getRuleOptions(getRuleSetting(reactConfig, "no-restricted-syntax"));

const ruleTester = createTsRuleTester({ jsx: true });

ruleTester.run("no-restricted-syntax", rule as unknown as TSESLint.RuleModule<string, unknown[]>, {
  valid: [
    {
      code: `
import type { ChangeEvent } from "react";
export type X = ChangeEvent<HTMLInputElement>;
      `.trim(),
      options,
    },
  ],
  invalid: [
    {
      code: `
import type React from "react";
export type X = React.ChangeEvent<HTMLInputElement>;
      `.trim(),
      options,
      errors: [
        {
          messageId: "restrictedSyntax",
        },
      ],
    },
  ],
});
