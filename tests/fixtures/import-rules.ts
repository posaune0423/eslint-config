// Triggers selected eslint-plugin-import rules from importConfig.

console.log("after statement"); // import/first

import type { Foo } from "./types"; // import/first (should also still parse)
import { type Bar } from "./types"; // import/consistent-type-specifier-style (prefer-top-level)
void (null as unknown as Foo | Bar);

import { something } from "./types";
import { something as something2 } from "./types"; // import/no-duplicates
void something2;

export let mutableExport = 1; // import/no-mutable-exports
void mutableExport;
