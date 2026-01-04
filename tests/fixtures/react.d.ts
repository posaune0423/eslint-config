// Minimal React type declarations for integration test fixtures.
// Avoids external dependency resolution issues in type-aware mode.

declare module "react" {
  export type ChangeEvent<T = Element> = {
    target: T;
    currentTarget: T;
  };

  export type PropsWithChildren<P = unknown> = P & { children?: ReactNode };

  export type DependencyList = readonly unknown[];
  export type EffectCallback = () => void | (() => void);
  export type Dispatch<A> = (value: A) => void;
  export type SetStateAction<S> = S | ((prevState: S) => S);

  export function useEffect(effect: EffectCallback, deps?: DependencyList): void;
  export function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];

  export type ReactNode = string | number | boolean | null | undefined;
  export type FC<P = object> = (props: P) => ReactNode;
}
