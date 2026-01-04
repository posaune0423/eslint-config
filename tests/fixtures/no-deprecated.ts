// Triggers @typescript-eslint/no-deprecated

/** @deprecated Use newGreet instead */
function greet(name: string): string {
  return `Hello, ${name}`;
}

// Calling deprecated function triggers the rule.
const message = greet("World");

export { message };
