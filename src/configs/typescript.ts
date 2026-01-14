import tseslint from "typescript-eslint";
import type { Linter } from "eslint";

/**
 * TypeScript config: strict type-checked rules + custom rules.
 */
export function typescriptConfig(): Linter.Config[] {
  return [
    ...(tseslint.configs.strictTypeChecked as Linter.Config[]),
    {
      name: "@posaune0423/typescript",
      rules: {
        // Prefer TS-aware versions of core rules when available.
        "dot-notation": "off",
        "no-dupe-class-members": "off",
        "no-implied-eval": "off",
        "no-redeclare": "off",
        "no-unused-expressions": "off",
        "no-use-before-define": "off",
        "no-useless-constructor": "off",

        "@typescript-eslint/await-thenable": "error",
        "@typescript-eslint/dot-notation": ["error", { allowKeywords: true }],
        "@typescript-eslint/no-dupe-class-members": "error",
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-for-in-array": "error",
        "@typescript-eslint/no-implied-eval": "error",
        "@typescript-eslint/no-misused-promises": "error",
        "@typescript-eslint/no-unnecessary-type-assertion": "error",
        "@typescript-eslint/no-unsafe-argument": "error",
        "@typescript-eslint/no-unsafe-assignment": "error",
        "@typescript-eslint/no-unsafe-call": "error",
        "@typescript-eslint/no-unsafe-member-access": "error",
        "@typescript-eslint/no-unsafe-return": "error",
        "@typescript-eslint/promise-function-async": "error",
        "@typescript-eslint/restrict-plus-operands": "error",
        "@typescript-eslint/restrict-template-expressions": "error",
        "@typescript-eslint/return-await": ["error", "in-try-catch"],
        "@typescript-eslint/strict-boolean-expressions": [
          "error",
          { allowNullableBoolean: true, allowNullableObject: true },
        ],
        "@typescript-eslint/switch-exhaustiveness-check": "error",
        "@typescript-eslint/unbound-method": "error",

        "@typescript-eslint/ban-ts-comment": ["error", { "ts-expect-error": "allow-with-description" }],
        "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
        "@typescript-eslint/method-signature-style": ["error", "property"], // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
        "@typescript-eslint/no-empty-object-type": ["error", { allowInterfaces: "always" }],
        "@typescript-eslint/no-import-type-side-effects": "error",
        "@typescript-eslint/no-redeclare": ["error", { builtinGlobals: false }],
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/no-unused-expressions": [
          "error",
          {
            allowShortCircuit: true,
            allowTaggedTemplates: true,
            allowTernary: true,
          },
        ],
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-use-before-define": ["error", { classes: false, functions: false, variables: true }],
        "@typescript-eslint/no-wrapper-object-types": "error",

        // Warn on deprecated APIs (requires type-aware linting)
        "@typescript-eslint/no-deprecated": "warn",

        // Disallow the `any` type - enforce proper typing
        "@typescript-eslint/no-explicit-any": "error",

        // Disallow unnecessary conditions (includes unnecessary optional chaining)
        "@typescript-eslint/no-unnecessary-condition": "error",

        // Enforce `import type { Foo } from "..."` for type-only imports
        "@typescript-eslint/consistent-type-imports": [
          "error",
          {
            disallowTypeAnnotations: false,
            prefer: "type-imports",
            fixStyle: "separate-type-imports",
          },
        ],
      },
    },
  ];
}
