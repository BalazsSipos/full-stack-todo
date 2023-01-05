module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks', 'sort-imports-es6-autofix', 'risxss'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-shadow': 'warn',
    'sort-imports-es6-autofix/sort-imports-es6': 'warn',
    'risxss/catch-potential-xss-react': 'error',
    'react/display-name': 'off',
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  env: {
    node: true,
  },
}
