// Shared types used by consistent-type-imports fixture.

export type UserId = string;

export type User = {
  id: UserId;
  name: string;
};

export type Foo = { bar: string };
export type Bar = { baz: number };
export const something = 1;
