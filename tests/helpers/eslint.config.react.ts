import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Linter } from "eslint";
import posaune from "../../src";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..", "..");

/**
 * ESLint config for integration tests using React config.
 * Enables type-aware linting for fixtures via projectService.
 */
export default [
  ...posaune({ react: true }),
  {
    name: "integration-test/type-aware",
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["tests/fixtures/*.ts", "tests/fixtures/*.tsx", "tests/fixtures/*.jsx"],
        },
        tsconfigRootDir: repoRoot,
      },
    },
  },
] as Linter.Config[];
