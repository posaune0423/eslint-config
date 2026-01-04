import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Linter } from "eslint";
import { baseConfig } from "../../src/base";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..", "..");

/**
 * ESLint config for integration tests using baseConfig.
 * Enables type-aware linting for fixtures via projectService.
 */
export default [
  ...baseConfig,
  {
    name: "integration-test/type-aware",
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.ts", "*.tsx"],
        },
        tsconfigRootDir: repoRoot,
      },
    },
  },
] as Linter.Config[];
