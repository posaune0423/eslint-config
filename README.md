# eslint-config

## Install

```bash
bun install
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

```bash
import { baseConfig } from "@posaune0423/eslint-config";

export default baseConfig;
```

This project was created using `bun init` in bun v1.3.5. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

## Publish (npm)

### GitHub Actions

This repository publishes to npm via GitHub Actions when you:

- push a tag like `v1.2.3`, or
- publish a GitHub Release

### Required GitHub Secret

Add a repository secret:

- **`NPM_TOKEN`**: an npm access token with permission to publish `@posaune0423/eslint-config`

### Recommended flow

1. Bump `package.json` version
2. Commit and push
3. Create and push a tag `vX.Y.Z` that matches the version
4. (Optional) Create a GitHub Release for that tag
