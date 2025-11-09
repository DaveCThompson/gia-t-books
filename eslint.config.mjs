import nextPlugin from "eslint-config-next";

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [
  // The default export from `eslint-config-next` includes all the necessary
  // configurations for Next.js, TypeScript, React, and Core Web Vitals.
  // This simplified setup is more robust and easier to maintain.
  nextPlugin,

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