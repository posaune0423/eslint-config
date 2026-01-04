import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Linter } from "eslint";
import { reactConfig } from "../../src/react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..", "..");

/**
 * ESLint config for integration tests using reactConfig.
 * Enables type-aware linting for fixtures via projectService.
 */
export default [
  ...reactConfig,
  {
    name: "integration-test/type-aware",
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.ts", "*.tsx", "*.jsx"],
        },
        tsconfigRootDir: repoRoot,
      },
    },
  },
] as Linter.Config[];
