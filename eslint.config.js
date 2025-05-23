import payloadEsLintConfig from "@payloadcms/eslint-config";

export const defaultESLintIgnores = [
  "**/.temp",
  "**/.*", // ignore all dotfiles
  "**/.git",
  "**/.hg",
  "**/.pnp.*",
  "**/.svn",
  "**/playwright.config.ts",
  "**/jest.config.js",
  "**/tsconfig.tsbuildinfo",
  "**/README.md",
  "**/eslint.config.js",
  "**/payload-types.ts",
  "**/dist/",
  "**/.yarn/",
  "**/build/",
  "**/node_modules/",
  "**/temp/",
  "plugins/*",
  "src/app/(frontend)/_components/checkout/*",
  "src/app/(frontend)/(checkout)/checkout/*",
  "src/app/(frontend)/_templates/checkout-form.tsx",
  "src/app/(frontend)/*",
  "src/app/api/services/policies.ts",
  "/src/app/(frontend)/(checkout)/checkout/page.tsx",
];

export default [
  ...payloadEsLintConfig,
  {
    ignores: defaultESLintIgnores,
  },
  {
    rules: {
      "no-restricted-exports": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/non-used-vars": "off",
      "perfectionist/sort-imports": "off",
      "@typescript-eslint/consistent-type-imports": "off",
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "perfectionist/sort-named-imports": "off",
    "perfectionist/sort-objects": "off"
    },
  },
  {
    languageOptions: {
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
        projectService: {
          maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING: 40,
          allowDefaultProject: [
            "scripts/*.ts",
            "*.js",
            "*.mjs",
            "*.spec.ts",
            "*.d.ts",
          ],
        },
        // projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
