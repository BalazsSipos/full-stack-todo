module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'sort-imports-es6-autofix'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-shadow': 'warn',
    'sort-imports-es6-autofix/sort-imports-es6': 'warn',
  },
  env: {
    node: true,
  },
};
