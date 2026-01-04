/**
 * Used by: `tests/rules/react-jsx-transform.test.ts`
 *
 * Expected:
 * - no report from:
 *   - `react/react-in-jsx-scope`
 *   - `react/jsx-uses-react`
 */

export default function Component() {
  return <div>Hello</div>;
}
