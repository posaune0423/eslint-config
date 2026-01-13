import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Linter } from "eslint";
import posaune from "../../src";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..", "..");

/**
 * ESLint config for integration tests using base TypeScript config.
 * Enables type-aware linting for fixtures via projectService.
 */
export default [
  ...posaune(),
  {
    name: "integration-test/type-aware",
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["tests/fixtures/*.ts", "tests/fixtures/*.tsx"],
        },
        tsconfigRootDir: repoRoot,
      },
    },
  },
] as Linter.Config[];
