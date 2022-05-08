module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
    project: ["tsconfig.json"],
    createDefaultProgram: true,
  },
  extends: "eslint:recommended",
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "@typescript-eslint/eslint-plugin"],
  ignorePatterns: ["webpack.config.js"],
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: ["tsconfig.json"],
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  globals: {
    chrome: true,
    window: true,
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": [
      0,
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-unused-vars": [1, { args: "none" }],
    "@typescript-eslint/no-non-null-assertion": 1,
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/ban-ts-ignore": 0,
    "@typescript-eslint/no-empty-function": "off",

    "@typescript-eslint/require-await": 0,
    "@typescript-eslint/no-misused-new": 0,
    "no-unused-vars": 1,
  },
};
