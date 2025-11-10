import nextPlugin from "eslint-config-next";
import prettierPlugin from "eslint-config-prettier";

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [
  // The default export from `eslint-config-next` includes all the necessary
  // configurations for Next.js, TypeScript, React, and Core Web Vitals.
  // This simplified setup is more robust and easier to maintain.
  nextPlugin,

  // This must be the last item in the array. It turns off any ESLint rules
  // that might conflict with Prettier's formatting rules.
  prettierPlugin,

  // You can add your own custom rules here as a separate object.
  // For example:
  // {
  //   rules: {
  //     "semi": "error",
  //     "prefer-const": "error"
  //   }
  // }
];

export default eslintConfig;