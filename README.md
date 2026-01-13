# @posaune0423/eslint-config

## Install

```bash
bun add -D @posaune0423/eslint-config
```

## Usage

Create `eslint.config.js` (or `eslint.config.ts`) in your project:

```js
import posaune from "@posaune0423/eslint-config";

export default posaune();
```

### React Project

```js
import posaune from "@posaune0423/eslint-config";

export default posaune({ react: true });
```

### Node.js Project

```js
import posaune from "@posaune0423/eslint-config";

export default posaune({ node: true });
```

### With Custom Overrides

```js
import posaune from "@posaune0423/eslint-config";

export default posaune(
  {
    react: true,
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

## Rules overview

This config intentionally stays **simple**:

- **Baseline**: mostly "recommended" presets from ESLint / TypeScript ESLint / React / Security
- **Customizations**: only the rules explicitly requested in this repo
- **No splitting** by `testFiles` or by "typechecked vs non-typechecked"
  - Note: `@typescript-eslint/no-deprecated` requires type information, so TypeScript linting is type-aware.

### Presets (recommended configs)

| Area     | Preset / Config                                                | What it does                                     | Link                                                                                                                                  |
| -------- | -------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| general  | `@eslint/js` recommended                                       | ESLint core recommended rules                    | [`@eslint/js`](https://github.com/eslint/eslint/tree/main/packages/js)                                                                |
| security | `eslint-plugin-security` recommended                           | Security best practices (always enabled)         | [`eslint-plugin-security`](https://github.com/eslint-community/eslint-plugin-security)                                                |
| ts       | `typescript-eslint` strict type-checked                        | TypeScript rules that use type information       | [TypeScript ESLint](https://typescript-eslint.io/getting-started/typed-linting)                                                       |
| react    | `@eslint-react/eslint-plugin` recommended                      | Modern React best-practice rules                 | [`@eslint-react/eslint-plugin`](https://github.com/rel1cx/eslint-react)                                                               |
| react    | `eslint-plugin-react-hooks` recommended                        | Enforces the Rules of Hooks                      | [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks)                                                |
| react    | `eslint-plugin-react-you-might-not-need-an-effect` recommended | Warns on common unnecessary `useEffect` patterns | [`eslint-plugin-react-you-might-not-need-an-effect`](https://github.com/NickvanDyke/eslint-plugin-react-you-might-not-need-an-effect) |
| node     | `eslint-plugin-n` recommended                                  | Node.js best practices                           | [`eslint-plugin-n`](https://github.com/eslint-community/eslint-plugin-n)                                                              |

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
  index.ts        # Public API (default export: posaune)
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
