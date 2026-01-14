# @posaune0423/eslint-config

## Install

```bash
bun add -D @posaune0423/eslint-config
```

## Usage

Create `eslint.config.ts` (recommended) or `eslint.config.js` in your project:

```js
import posaune0423 from "@posaune0423/eslint-config";

export default posaune0423();
```

### React Project

```js
import posaune0423 from "@posaune0423/eslint-config";

export default posaune0423({ react: true });
```

### Node.js Project

```js
import posaune0423 from "@posaune0423/eslint-config";

export default posaune0423({ node: true });
```

### With Custom Overrides

```js
import posaune0423 from "@posaune0423/eslint-config";

export default posaune0423(
  {
    react: true,
  },
  // Enable typed linting for your project (recommended when using TypeScript)
  // See "Type-aware linting" section below.
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ignores: ["dist", "node_modules"],
  },
  {
    rules: {
      "security/detect-object-injection": "off",
    },
  },
  {
    files: ["**/*.test.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
);
```

## Configuration Options

| Option       | Type      | Default | Description                                      |
| ------------ | --------- | ------- | ------------------------------------------------ |
| `typescript` | `boolean` | `true`  | Enable TypeScript rules (strictTypeChecked)      |
| `react`      | `boolean` | `false` | Enable React rules (@eslint-react + react-hooks) |
| `node`       | `boolean` | `false` | Enable Node.js rules (eslint-plugin-n)           |

## What this config includes

This package exports a factory (default export) that returns an ESLint **flat config** array.

- **Always enabled**:
  - **ESLint core**: `@eslint/js` recommended
  - **Imports**: `eslint-plugin-import` + TypeScript-aware resolver (`eslint-import-resolver-typescript`)
  - **Security**: `eslint-plugin-security` recommended
  - **Unicorn**: selected `eslint-plugin-unicorn` rules
- **Optional**:
  - **TypeScript**: `typescript-eslint` `strictTypeChecked` + a few opinionated rules (default: on)
  - **React**: `@eslint-react/eslint-plugin` + `react-hooks` + `react-you-might-not-need-an-effect`
  - **Node.js**: `eslint-plugin-n` flat recommended

Note: build output under `dist/**` is ignored by default.

## Type-aware linting (TypeScript)

This config enables type-aware TypeScript rules (via `typescript-eslint` strict type-checked rules).  
In most projects you should add a small override to turn on typed linting:

```js
import posaune0423 from "@posaune0423/eslint-config";

export default posaune0423(
  {},
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
```

If you do not enable typed linting, rules that require type information (e.g. `@typescript-eslint/no-deprecated`) may error.

## Rules overview

This config intentionally stays **simple**:

- **Baseline**: mostly "recommended" presets from ESLint / TypeScript ESLint / React / Security / Import
- **Customizations**: only the rules explicitly requested in this repo
- **No splitting** by `testFiles` or by "typechecked vs non-typechecked"
  - Note: `@typescript-eslint/no-deprecated` requires type information, so TypeScript linting is type-aware.

### Presets (recommended configs)

| Area     | Preset / Config                                                | What it does                                     | Link                                                                                                                                  |
| -------- | -------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| general  | `@eslint/js` recommended                                       | ESLint core recommended rules                    | [`@eslint/js`](https://github.com/eslint/eslint/tree/main/packages/js)                                                                |
| import   | `eslint-plugin-import` (selected rules)                        | Import/order and module correctness              | [`eslint-plugin-import`](https://github.com/import-js/eslint-plugin-import)                                                           |
| security | `eslint-plugin-security` recommended                           | Security best practices (always enabled)         | [`eslint-plugin-security`](https://github.com/eslint-community/eslint-plugin-security)                                                |
| ts       | `typescript-eslint` strict type-checked                        | TypeScript rules that use type information       | [TypeScript ESLint](https://typescript-eslint.io/getting-started/typed-linting)                                                       |
| react    | `@eslint-react/eslint-plugin` recommended                      | Modern React best-practice rules                 | [`@eslint-react/eslint-plugin`](https://github.com/rel1cx/eslint-react)                                                               |
| react    | `eslint-plugin-react-hooks` recommended                        | Enforces the Rules of Hooks                      | [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks)                                                |
| react    | `eslint-plugin-react-you-might-not-need-an-effect` recommended | Warns on common unnecessary `useEffect` patterns | [`eslint-plugin-react-you-might-not-need-an-effect`](https://github.com/NickvanDyke/eslint-plugin-react-you-might-not-need-an-effect) |
| node     | `eslint-plugin-n` recommended                                  | Node.js best practices                           | [`eslint-plugin-n`](https://github.com/eslint-community/eslint-plugin-n)                                                              |
| misc     | `eslint-plugin-unicorn` (selected rules)                       | Small correctness / readability improvements     | [`eslint-plugin-unicorn`](https://github.com/sindresorhus/eslint-plugin-unicorn)                                                      |

### Explicit customizations

| Area  | Rule / Setting                                | Level | What it does                                                          |
| ----- | --------------------------------------------- | ----- | --------------------------------------------------------------------- |
| ts    | `@typescript-eslint/no-deprecated`            | warn  | Disallow using code marked as `@deprecated`                           |
| ts    | `@typescript-eslint/no-explicit-any`          | error | Disallow the `any` type                                               |
| ts    | `@typescript-eslint/no-unnecessary-condition` | error | Disallow unnecessary conditions (includes unnecessary optional chain) |
| ts    | `@typescript-eslint/consistent-type-imports`  | error | Enforce `import type { Foo } from "..."`                              |
| react | `unicorn/filename-case` (kebabCase)           | error | Enforce `kebab-case` filenames                                        |
| react | `no-restricted-syntax` (React.\* types)       | error | Disallow `React.Foo` namespace types                                  |

## Project Structure

```
src/
  index.ts        # Public API (default export: posaune0423)
  factory.ts      # Factory function implementation
  types.ts        # TypeScript types
  configs/        # Configuration objects
    eslint.ts
    typescript.ts
    security.ts
    react.ts
    node.ts
```

## Development

### Tests

```bash
bun test
```

## Publish (npm)

Push a tag like `v1.2.3` or publish a GitHub Release to trigger npm publish via GitHub Actions.
