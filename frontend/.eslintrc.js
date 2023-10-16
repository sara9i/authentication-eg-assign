// README : https://dev.to/onygami/eslint-and-prettier-for-react-apps-bonus-next-js-and-typescript-3e46

// Can add "eslint-plugin-simple-import-sort": "^7.0.0", to package.json in dev dependency if we want to re-enable simple-import-sort

module.exports = {
  root: true, // Make sure eslint picks up the config at the root of the directory
  parserOptions: {
    ecmaVersion: 'latest', // Use the latest ecmascript standard
    sourceType: 'module', // Allows using import/export statements
    ecmaFeatures: {
      jsx: true // Enable JSX since we're using React
    }
  },
  settings: {
    react: {
      version: 'detect' // Automatically detect the react version
    }
  },
  env: {
    browser: true, // Enables browser globals like window and document
    amd: true, // Enables require() and define() as global variables as per the amd spec.
    node: true, // Enables Node.js global variables and Node.js scoping.
    jest: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended' // Make this the last element so prettier config overrides other formatting rules
  ],
  rules: {
    'react/prop-types': 'off', // TODO - Remove line after migration to TypeScript
    'no-case-declarations': 'off',
    'jsx-a11y/click-events-have-key-events': 'off', // TODO - Remove later
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        printWidth: 75,
        usePrettierrc: true
      }
    ] // Use our .prettierrc file as source
    // 'simple-import-sort/imports': 'error',
    // 'simple-import-sort/exports': 'error'
  },
  plugins: ['react-hooks']
  // plugins: ['simple-import-sort', 'react-hooks']
};
