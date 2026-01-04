// Triggers @typescript-eslint/no-unnecessary-condition (unnecessary optional chain)

type User = { name: string };

declare const user: User;

// `user.name` is always defined, so `?.` is unnecessary.
const upper = user.name?.toUpperCase();

export { upper };
