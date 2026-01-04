/**
 * Used by: `tests/rules/you-might-not-need-an-effect.test.ts`
 *
 * Expected:
 * - warning: `react-you-might-not-need-an-effect/no-empty-effect`
 */

declare const useEffect: (effect: () => void, deps: readonly unknown[]) => void;

export function Component() {
  useEffect(() => {}, []);
  return null;
}
