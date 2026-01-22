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
  const react = reactPlugin.configs.all.plugins["@eslint-react"];
  const reactDom = reactPlugin.configs.all.plugins["@eslint-react/dom"];
  const reactHooksExtra = reactPlugin.configs.all.plugins["@eslint-react/hooks-extra"];
  const reactWebApi = reactPlugin.configs.all.plugins["@eslint-react/web-api"];

  return [
    // @eslint-react/eslint-plugin recommended config
    reactPlugin.configs.recommended as Linter.Config,

    // React hooks and additional plugins + custom rules
    {
      name: "@posaune0423/react",
      files: ["**/*.{jsx,tsx}"],
      plugins: {
        // Map eslint-react plugins to Antfu-style namespaces
        // so we can use `react/*`, `react-dom/*`, `react-hooks-extra/*`, `react-web-api/*` rule IDs.
        react,
        "react-dom": reactDom,
        "react-hooks-extra": reactHooksExtra,
        "react-web-api": reactWebApi,

        "react-hooks": reactHooksPlugin as unknown as ESLint.Plugin,
        "react-you-might-not-need-an-effect": reactYouMightNotNeedAnEffect,
        unicorn: unicornPlugin,
      },
      rules: {
        // React Hooks rules
        ...reactHooksPlugin.configs.recommended.rules,

        // "You might not need an effect" rules
        ...reactYouMightNotNeedAnEffect.configs.recommended.rules,

        // recommended rules from eslint-plugin-react-x https://eslint-react.xyz/docs/rules/overview#core-rules
        "react/jsx-key-before-spread": "warn",
        "react/no-comment-textnodes": "warn",
        "react/jsx-no-duplicate-props": "warn",
        "react/jsx-uses-react": "warn",
        "react/jsx-uses-vars": "warn",
        "react/no-access-state-in-setstate": "error",
        "react/no-array-index-key": "warn",
        "react/no-children-count": "warn",
        "react/no-children-for-each": "warn",
        "react/no-children-map": "warn",
        "react/no-children-only": "warn",
        "react/no-children-to-array": "warn",
        "react/no-clone-element": "warn",
        "react/no-component-will-mount": "error",
        "react/no-component-will-receive-props": "error",
        "react/no-component-will-update": "error",
        "react/no-context-provider": "warn",
        "react/no-create-ref": "error",
        "react/no-default-props": "error",
        "react/no-direct-mutation-state": "error",
        "react/no-duplicate-key": "error",
        "react/no-forward-ref": "warn",
        "react/no-implicit-key": "warn",
        "react/no-missing-key": "error",
        "react/no-nested-component-definitions": "error",
        "react/no-nested-lazy-component-declarations": "error",
        "react/no-prop-types": "error",
        "react/no-redundant-should-component-update": "error",
        "react/no-set-state-in-component-did-mount": "warn",
        "react/no-set-state-in-component-did-update": "warn",
        "react/no-set-state-in-component-will-update": "warn",
        "react/no-string-refs": "error",
        "react/no-unsafe-component-will-mount": "warn",
        "react/no-unsafe-component-will-receive-props": "warn",
        "react/no-unsafe-component-will-update": "warn",
        "react/no-use-context": "warn",
        "react/no-useless-forward-ref": "warn",
        "react/prefer-react-namespace-import": "error",

        // recommended rules from eslint-plugin-react-dom https://eslint-react.xyz/docs/rules/overview#dom-rules
        "react-dom/no-dangerously-set-innerhtml": "warn",
        "react-dom/no-dangerously-set-innerhtml-with-children": "error",
        "react-dom/no-find-dom-node": "error",
        "react-dom/no-flush-sync": "error",
        "react-dom/no-hydrate": "error",
        "react-dom/no-namespace": "error",
        "react-dom/no-render": "error",
        "react-dom/no-render-return-value": "error",
        "react-dom/no-script-url": "warn",
        "react-dom/no-unsafe-iframe-sandbox": "warn",
        "react-dom/no-use-form-state": "error",
        "react-dom/no-void-elements-with-children": "error",

        // recommended rules eslint-plugin-react-hooks https://github.com/facebook/react/blob/main/packages/eslint-plugin-react-hooks/README.md
        // Core hooks rules
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",

        // recommended rules from eslint-plugin-react-hooks-extra https://eslint-react.xyz/docs/rules/overview#hooks-extra-rules
        "react-hooks-extra/no-unnecessary-use-prefix": "warn",
        "react-hooks-extra/prefer-use-state-lazy-initialization": "warn",
        "react-hooks-extra/no-direct-set-state-in-use-effect": "warn",

        // recommended rules from eslint-plugin-react-web-api https://eslint-react.xyz/docs/rules/overview#web-api-rules
        "react-web-api/no-leaked-event-listener": "warn",
        "react-web-api/no-leaked-interval": "warn",
        "react-web-api/no-leaked-resize-observer": "warn",
        "react-web-api/no-leaked-timeout": "warn",

        // Enforce kebab-case filenames (Next.js-style)
        "unicorn/filename-case": [
          "error",
          {
            case: "kebabCase",
          },
        ],
      },
    },
  ];
}
