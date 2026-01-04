/**
 * Used by: `tests/rules/react-no-react-namespace-type.test.ts`
 *
 * Expected:
 * - error: `no-restricted-syntax` (React namespace type is disallowed)
 *   Message should instruct using `import type { ChangeEvent } from "react"`.
 */

export type OnChange = (e: React.ChangeEvent<HTMLInputElement>) => void;

declare class HTMLInputElement {}
