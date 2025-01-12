/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@giritoday/eslint-config/react-internal.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
