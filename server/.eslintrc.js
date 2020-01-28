module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
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
    "dot-notation": 0,
    quotes: [
      2,
      "double",
      {
        avoidEscape: true, // allows strings to use single-quotes or double-quotes so long as the string contains a quote that would have to be escaped otherwise
        allowTemplateLiterals: true // allows strings to use backticks
      }
    ],
    "prettier/prettier": [
      "error",
      {
        trailingComma: "all",
        singleQuote: false
      }
    ]
  },
  plugins: ["prettier"]
};
