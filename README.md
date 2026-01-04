# eslint-config

## Install

```bash
bun add -D @posaune0423/eslint-config
```

## Usage (ESLint Flat Config)

Create `eslint.config.js` (or `eslint.config.ts`) in your project and import the configuration you want to use.

### Node.js

```js
import { nodeConfig } from "@posaune0423/eslint-config";

export default nodeConfig;
```

### React

```js
import { reactConfig } from "@posaune0423/eslint-config";

export default reactConfig;
```

### Base (generic TypeScript)

```js
import { baseConfig } from "@posaune0423/eslint-config";

export default baseConfig;
```

## Rules overview

This config intentionally stays **simple**:

- **Baseline**: mostly "recommended" presets from ESLint / TypeScript ESLint / React
- **Customizations**: only the rules explicitly requested in this repo
- **No splitting** by `testFiles` or by "typechecked vs non-typechecked"
  - Note: `@typescript-eslint/no-deprecated` requires type information, so TypeScript linting is type-aware.

### Presets (recommended configs)

| Area    | Preset / Config                                                                          | What it does                                     | Link                                                                                                                                  |
| ------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| general | `@eslint/js` recommended (`eslint.configs.recommended`)                                  | ESLint core recommended rules                    | [`@eslint/js`](https://github.com/eslint/eslint/tree/main/packages/js)                                                                |
| ts      | `typescript-eslint` recommended type-checked (`tseslint.configs.recommendedTypeChecked`) | TypeScript rules that use type information       | [TypeScript ESLint: Typed Linting](https://typescript-eslint.io/getting-started/typed-linting)                                        |
| react   | `eslint-plugin-react` recommended                                                        | React best-practice rules                        | [`eslint-plugin-react`](https://github.com/jsx-eslint/eslint-plugin-react)                                                            |
| react   | `eslint-plugin-react-hooks` recommended                                                  | Enforces the Rules of Hooks                      | [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks)                                                |
| react   | `eslint-plugin-react-you-might-not-need-an-effect` recommended                           | Warns on common unnecessary `useEffect` patterns | [`eslint-plugin-react-you-might-not-need-an-effect`](https://github.com/NickvanDyke/eslint-plugin-react-you-might-not-need-an-effect) |

### Explicit customizations (only what was requested)

| Area         | Rule / Setting                                                                                               | Level | What it does                                                          | Rule doc                                                                                               | Plugin doc                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------ | ----- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| general / ts | `@typescript-eslint/no-deprecated`                                                                           | warn  | Disallow using code marked as `@deprecated`                           | [Rule](https://typescript-eslint.io/rules/no-deprecated/)                                              | [TypeScript ESLint](https://typescript-eslint.io/)                               |
| ts           | `@typescript-eslint/no-explicit-any`                                                                         | error | Disallow the `any` type                                               | [Rule](https://typescript-eslint.io/rules/no-explicit-any/)                                            | [TypeScript ESLint](https://typescript-eslint.io/)                               |
| ts           | `@typescript-eslint/no-unnecessary-condition`                                                                | error | Disallow unnecessary conditions (includes unnecessary optional chain) | [Rule](https://typescript-eslint.io/rules/no-unnecessary-condition/)                                   | [TypeScript ESLint](https://typescript-eslint.io/)                               |
| ts           | `@typescript-eslint/consistent-type-imports` (`prefer: "type-imports"`, `fixStyle: "separate-type-imports"`) | error | Enforce `import type { Foo } from "..."`                              | [Rule](https://typescript-eslint.io/rules/consistent-type-imports/)                                    | [TypeScript ESLint](https://typescript-eslint.io/)                               |
| react        | `react/react-in-jsx-scope`                                                                                   | off   | React 17+ JSX transform: don’t require `import React`                 | [Rule](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md) | [`eslint-plugin-react`](https://github.com/jsx-eslint/eslint-plugin-react)       |
| react        | `react/jsx-uses-react`                                                                                       | off   | React 17+ JSX transform: don’t require React to be referenced in JSX  | [Rule](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md)     | [`eslint-plugin-react`](https://github.com/jsx-eslint/eslint-plugin-react)       |
| react        | `unicorn/filename-case` (`case: "kebabCase"`)                                                                | error | Enforce `kebab-case` filenames (e.g. Next.js style)                   | [Rule](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md)    | [`eslint-plugin-unicorn`](https://github.com/sindresorhus/eslint-plugin-unicorn) |
| react        | `no-restricted-syntax` (for `React.*` namespace types)                                                       | error | Disallow `React.Foo` namespace types in favor of direct type imports  | [Rule](https://eslint.org/docs/latest/rules/no-restricted-syntax)                                      | [ESLint](https://eslint.org/)                                                    |

This project was created using `bun init` in bun v1.3.5. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

## Development

### Tests

Tests are written with **`@typescript-eslint/rule-tester`** (a typed fork of ESLint's `RuleTester`) and run with Bun:

```bash
bun test
```

This approach avoids spawning the ESLint CLI per test case and keeps tests fast.

References:

- [`@typescript-eslint/rule-tester` docs](https://typescript-eslint.io/packages/rule-tester/)
- [ESLint: Writing tests](https://eslint.org/docs/latest/contribute/tests)

## Publish (npm)

### GitHub Actions

This repository publishes to npm via GitHub Actions when you:

- push a tag like `v1.2.3`, or
- publish a GitHub Release

### Trusted Publishing Setup

This repository uses **trusted publishing** with OIDC for secure npm publishing. No tokens are required.

#### Initial Setup

1. Go to https://www.npmjs.com/package/@posaune0423/eslint-config
2. Navigate to **Settings** → **Publishing access** → **Trusted publishers**
3. Click **Add trusted publisher**
4. Select **GitHub Actions** and configure:
   - **Owner**: `posaune0423`
   - **Repository**: `eslint-config`
   - **Workflow filename**: `npm-publish.yml` (must include `.yml` extension)
5. Click **Save**

The workflow file is already configured with the required `id-token: write` permission for OIDC authentication.

### Recommended flow

1. Bump `package.json` version
2. Commit and push
3. Create and push a tag `vX.Y.Z` that matches the version
4. (Optional) Create a GitHub Release for that tag
