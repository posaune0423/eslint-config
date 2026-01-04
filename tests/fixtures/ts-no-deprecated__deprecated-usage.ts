/**
 * Used by: `tests/rules/no-deprecated.test.ts`
 *
 * Expected:
 * - warning: `@typescript-eslint/no-deprecated`
 */

/** @deprecated Use apiV2 instead. */
declare function apiV1(): void;
declare function apiV2(): void;

apiV1();
