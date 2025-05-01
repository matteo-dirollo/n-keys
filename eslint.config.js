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
];

export default [
  ...payloadEsLintConfig,
  {
    ignores: defaultESLintIgnores,
  },
  {
    plugins: ["@next/eslint-plugin-next"],

    rules: {
      "react/no-unescaped-entities": "off", // Disable this rule
      "@next/next/no-page-custom-font": "off", // Disable this rule
      "no-restricted-exports": "off", // Example of an existing rule
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "next/core-web-vitals",
    ],
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
