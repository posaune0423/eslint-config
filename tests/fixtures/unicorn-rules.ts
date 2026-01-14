// Triggers selected unicorn rules from unicornConfig.

declare const condition: boolean;

// unicorn/consistent-empty-array-spread
const _consistentEmptyArraySpread = [0, ...(condition ? [1] : ""), 2];
void _consistentEmptyArraySpread;

// unicorn/error-message
export function _unicornErrorMessage(): never {
  throw new Error();
}

// unicorn/escape-case
const _escapeCase = "\x1b";
void _escapeCase;

// unicorn/new-for-builtins
const _newForBuiltins = Date();
void _newForBuiltins;

// unicorn/no-instanceof-builtins
const _unknownValue: unknown = [];
const _noInstanceofBuiltins = _unknownValue instanceof Array;
void _noInstanceofBuiltins;

// unicorn/no-new-array
const _noNewArray = new Array(1);
void _noNewArray;

// unicorn/no-new-buffer
declare const Buffer: { new (size: number): unknown };
const _noNewBuffer = new Buffer(10);
void _noNewBuffer;

// unicorn/number-literal-case
const _numberLiteralCase = 0xff;
void _numberLiteralCase;

// unicorn/prefer-dom-node-text-content
type FakeElement = { innerText: string; textContent: string | null };
declare const _el: FakeElement;
const _preferDomNodeTextContent = _el.innerText;
void _preferDomNodeTextContent;

// unicorn/prefer-includes
const _preferIncludes = "abc".indexOf("a") !== -1;
void _preferIncludes;

// unicorn/prefer-node-protocol
declare module "path" {
  const path: { sep: string };
  export default path;
}
import path from "path";
void path.sep;

// unicorn/prefer-number-properties
const _preferNumberProperties = isNaN(1);
void _preferNumberProperties;

// unicorn/prefer-string-starts-ends-with
const _preferStringStartsEndsWith = /^a/.test("abc");
void _preferStringStartsEndsWith;

// unicorn/prefer-type-error
export function _preferTypeError(value: unknown): string {
  if (typeof value !== "string") {
    throw new Error("Expected string");
  }

  return value;
}

// unicorn/throw-new-error
export function _throwNewError(): never {
  throw Error("Boom");
}
