/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/node"],
  rules: {
    "no-warning-comments": ["error", { "terms": ["-webkit-appearance"], "location": "anywhere" }]
  },
  ignorePatterns: ["**/node_modules/**", "**/dist/**", "**/build/**", "**/public/**"]
};
