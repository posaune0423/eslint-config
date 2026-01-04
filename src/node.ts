import eslint from "@eslint/js";
import type { Linter } from "eslint";

import tseslint from "typescript-eslint";
import { baseRulesConfig } from "./base";

export const nodeConfig: Linter.Config[] = [
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  baseRulesConfig,
];

export default nodeConfig;
