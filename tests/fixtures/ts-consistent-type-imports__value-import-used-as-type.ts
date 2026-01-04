/**
 * Used by: `tests/rules/consistent-type-imports.test.ts`
 *
 * Expected:
 * - error: `@typescript-eslint/consistent-type-imports`
 *
 * Note:
 * - This intentionally imports a value (`import { Foo } ...`) but uses it only as a type.
 *   The rule should require `import type { Foo } ...`.
 */

import { Foo } from "./types";

type T = Foo;
export const t = null as unknown as T;
