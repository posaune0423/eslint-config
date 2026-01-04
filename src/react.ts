import eslint from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactYouMightNotNeedAnEffect from "eslint-plugin-react-you-might-not-need-an-effect";
import unicornPlugin from "eslint-plugin-unicorn";

import tseslint from "typescript-eslint";
import type { Linter } from "eslint";
import type { ConfigArray } from "typescript-eslint";
import { baseRulesConfig } from "./base";

type FlatConfigPlugin = NonNullable<Linter.Config["plugins"]>[string];

function asEslintPlugin(plugin: unknown): FlatConfigPlugin {
  // Some plugins expose extra non-standard fields that don't fit ESLint's declared plugin types.
  return plugin as FlatConfigPlugin;
}

const reactPlugins: NonNullable<Linter.Config["plugins"]> = {
  react: asEslintPlugin(reactPlugin),
  "react-hooks": asEslintPlugin(reactHooksPlugin),
  "react-you-might-not-need-an-effect": asEslintPlugin(reactYouMightNotNeedAnEffect),
  unicorn: asEslintPlugin(unicornPlugin),
};

const reactSettings: Linter.Config["settings"] = {
  react: {
    version: "detect",
  },
};

const reactRecommendedConfig: Linter.Config = {
  name: "@posaune0423/react/recommended",
  files: ["**/*.{jsx,tsx}"],

  plugins: reactPlugins,
  settings: reactSettings,
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
    // react - avoid React namespace types like `React.ChangeEvent`
    // Prefer: `import type { ChangeEvent } from "react"` and `ChangeEvent`
    "no-restricted-syntax": [
      "error",
      {
        selector: "TSTypeReference > TSQualifiedName[left.name='React']",
        message:
          'Avoid React namespace types (e.g. `React.ChangeEvent`). Prefer `import type { ChangeEvent } from "react"` and use `ChangeEvent` directly.',
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
