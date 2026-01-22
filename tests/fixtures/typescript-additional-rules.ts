// Triggers additional rules configured in typescriptConfig.

/* eslint-disable @typescript-eslint/no-unused-vars */

// @typescript-eslint/consistent-type-definitions (prefer interface)
type _TypeAliasObject = { a: number };

// @typescript-eslint/method-signature-style (prefer property signatures)
interface _MethodSignatureStyle {
  foo(): void;
}

// @typescript-eslint/no-empty-object-type
type _EmptyObjectType = {};

// @typescript-eslint/no-wrapper-object-types
const _wrapper: String = new String("x");
void _wrapper;

// @typescript-eslint/dot-notation
const _dotNotationObj = { bar: 1 };
const _dotNotation = _dotNotationObj["bar"];
void _dotNotation;

// @typescript-eslint/promise-function-async
function _promiseFunctionAsync(): Promise<number> {
  return Promise.resolve(1);
}

// @typescript-eslint/return-await (in-try-catch)
async function _returnAwaitInTryCatch(): Promise<number> {
  try {
    return Promise.resolve(1);
  } catch {
    return 0;
  }
}

// @typescript-eslint/restrict-plus-operands
const _restrictPlusOperands = 1 + "2";
void _restrictPlusOperands;

// @typescript-eslint/restrict-template-expressions
const _restrictTemplateExpressions = `${{ a: 1 }}`;
void _restrictTemplateExpressions;

// @typescript-eslint/switch-exhaustiveness-check
function _switchNotExhaustive(x: "a" | "b") {
  switch (x) {
    case "a":
      return 1;
  }
  return 0;
}

// @typescript-eslint/unbound-method
const _date = new Date();
const _unboundGetTime = _date.getTime;
_unboundGetTime();

// @typescript-eslint/await-thenable
async function _awaitNonThenable() {
  await 1;
}

// @typescript-eslint/no-floating-promises
Promise.resolve(1);

// @typescript-eslint/no-for-in-array
for (const _i in [1, 2, 3]) {
  // noop
}

// @typescript-eslint/no-implied-eval
const _fn = new Function("return 1");
void _fn;

// @typescript-eslint/no-misused-promises
[1, 2, 3].forEach(async () => {
  await Promise.resolve();
});

// @typescript-eslint/no-unnecessary-type-assertion
const _alreadyNumber: number = 1;
const _unnecessaryTypeAssertion = _alreadyNumber as number;
void _unnecessaryTypeAssertion;

// @typescript-eslint/ban-ts-comment (ts-expect-error requires description)
// @ts-expect-error
const _banTsComment: number = "x";
