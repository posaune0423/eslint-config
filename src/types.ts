/**
 * Options for posaune ESLint config.
 */
export interface Options {
  /**
   * Enable TypeScript rules.
   * @default true
   */
  typescript?: boolean;

  /**
   * Enable React rules (includes react-hooks and additional React best practices).
   * @default false
   */
  react?: boolean;

  /**
   * Enable Node.js rules (includes eslint-plugin-n).
   * @default false
   */
  node?: boolean;
}
