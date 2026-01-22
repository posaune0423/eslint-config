import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Linter } from "eslint";
import posaune from "../../src";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..", "..");

/**
 * ESLint config for integration tests using Node.js config.
 * Enables type-aware linting for fixtures via projectService.
 */
export default [
  ...posaune({ node: true }),
  {
    name: "integration-test/type-aware",
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            "tests/fixtures/*.ts",
            "tests/fixtures/*.tsx",
            "tests/scripts/**/*.{ts,tsx,mts,cts}",
            "tests/bin/**/*.{ts,tsx,mts,cts}",
          ],
        },
        tsconfigRootDir: repoRoot,
      },
    },
  },
] as Linter.Config[];
