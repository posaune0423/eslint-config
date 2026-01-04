import eslint from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactYouMightNotNeedAnEffect from "eslint-plugin-react-you-might-not-need-an-effect";
import unicornPlugin from "eslint-plugin-unicorn";

import tseslint from "typescript-eslint";
import type { Linter, ESLint } from "eslint";
import type { ConfigArray } from "typescript-eslint";
import { baseRulesConfig } from "./base";

const reactRecommendedConfig: Linter.Config = {
  name: "@posaune0423/react/recommended",
  files: ["**/*.{jsx,tsx}"],
  plugins: {
    react: reactPlugin,
    "react-hooks": reactHooksPlugin as unknown as ESLint.Plugin,
    "react-you-might-not-need-an-effect": reactYouMightNotNeedAnEffect,
    unicorn: unicornPlugin,
  },
  rules: {
    ...reactPlugin.configs.recommended.rules,
    ...reactHooksPlugin.configs.recommended.rules,
    ...reactYouMightNotNeedAnEffect.configs.recommended.rules,
    // react - omit `React.` / React import with the new JSX transform
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    // react - enforce kebab-case filenames (Next.js-style)
    "unicorn/filename-case": [
      "error",
      {
        case: "kebabCase",
      },
    ],
    // react - avoid React namespace types like `React.Foo`
    // Prefer: `import type { Foo } from "react"` and `Foo`
    "no-restricted-syntax": [
      "error",
      {
        selector: "TSQualifiedName[left.name='React']",
        message:
          'Avoid React namespace types (e.g. `React.Foo`). Prefer `import type { Foo } from "react"` and use `Foo` directly.',
      },
    ],
  },
};

export const reactConfig: ConfigArray = [
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  baseRulesConfig,
  reactRecommendedConfig,
];

export default reactConfig;
