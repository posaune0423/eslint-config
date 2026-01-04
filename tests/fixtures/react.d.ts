declare module "react" {
  export type ChangeEvent<T = unknown> = { target: T };
}

declare namespace React {
  export type ChangeEvent<T = unknown> = { target: T };
}
