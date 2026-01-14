declare module "eslint-plugin-security" {
  import type { Linter, ESLint } from "eslint";

  const plugin: ESLint.Plugin & {
    configs: {
      recommended: Linter.Config;
    };
  };

  export default plugin;
}
