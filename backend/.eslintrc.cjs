module.exports = {
  root: true,
  env: { node: true, browser: true, es2020: true },
  extends: ['eslint:recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  rules: {}
}
