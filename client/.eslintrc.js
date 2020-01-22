module.exports = {
  'extends': [
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  // babel-eslint parser is used to support experimental features not supported in ESLint itself yet
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 8,
    'ecmaFeatures': {
      'impliedStrict': true, //enable global strict mode (if ecmaVersion is 5 or greater)
    }
  },
  root: true,
  'env': {
    'browser': true,
    'node': true,
    'jest': true
  },
  'rules': {
    "arrow-body-style": ["error", "as-needed"],
    'react/state-in-constructor': 0,
    'react/no-spreading-props': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    // disables the windows/unix linebreak checks.
    'linebreak-style': 0,
    'linebreak-style': [0, 'error', 'windows'],
    //  allow .js extensions for JSX.
    'react/jsx-filename-extension': [
      1,
      {
        'extensions': [
          '.js',
          '.jsx'
        ]
      }
    ],
    'quotes': [
      2,
      'single',
      {
        'avoidEscape': true, // allows strings to use single-quotes or double-quotes so long as the string contains a quote that would have to be escaped otherwise
        'allowTemplateLiterals': true // allows strings to use backticks
      }
    ],
    // configure the prettier plugin
    'prettier/prettier': [
      'error',
      {
        'trailingComma': 'es5',
        'singleQuote': true,
      }
    ]
  },
  'plugins': [
    'react',
    'prettier'
  ]
};
