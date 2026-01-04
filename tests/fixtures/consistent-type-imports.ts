// Triggers @typescript-eslint/consistent-type-imports
// Uses value import for type-only usage (should use `import type`).

import { User } from "./types";

export type Admin = User & { admin: true };
