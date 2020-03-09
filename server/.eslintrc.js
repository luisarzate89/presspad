module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: ["airbnb-base", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "no-underscore-dangle": 0,
    "destructuring-assignment": 0,
    "consistent-return":0,
    "dot-notation": 0,
    "prettier/prettier": [
      "error",
      {
        trailingComma: "all",
        singleQuote: true
      }
    ],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
  },
  plugins: ["prettier"]
};
