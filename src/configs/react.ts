import reactPlugin from "@eslint-react/eslint-plugin";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactYouMightNotNeedAnEffect from "eslint-plugin-react-you-might-not-need-an-effect";
import unicornPlugin from "eslint-plugin-unicorn";
import type { Linter, ESLint } from "eslint";

/**
 * React config: @eslint-react + react-hooks + react-you-might-not-need-an-effect + custom rules.
 * Scoped to JSX/TSX files.
 */
export function reactConfig(): Linter.Config[] {
  return [
    // @eslint-react/eslint-plugin recommended config
    reactPlugin.configs.recommended as Linter.Config,

    // React hooks and additional plugins + custom rules
    {
      name: "@posaune0423/react",
      files: ["**/*.{jsx,tsx}"],
      plugins: {
        "react-hooks": reactHooksPlugin as unknown as ESLint.Plugin,
        "react-you-might-not-need-an-effect": reactYouMightNotNeedAnEffect,
        unicorn: unicornPlugin,
      },
      rules: {
        // React Hooks rules
        ...reactHooksPlugin.configs.recommended.rules,

        // "You might not need an effect" rules
        ...reactYouMightNotNeedAnEffect.configs.recommended.rules,

        // Enforce kebab-case filenames (Next.js-style)
        "unicorn/filename-case": [
          "error",
          {
            case: "kebabCase",
          },
        ],

        // Avoid React namespace types like `React.Foo`
        // Prefer: `import type { Foo } from "react"` and use `Foo` directly
        "no-restricted-syntax": [
          "error",
          {
            selector: "TSQualifiedName[left.name='React']",
            message:
              'Avoid React namespace types (e.g. `React.Foo`). Prefer `import type { Foo } from "react"` and use `Foo` directly.',
          },
        ],
      },
    },
  ];
}
