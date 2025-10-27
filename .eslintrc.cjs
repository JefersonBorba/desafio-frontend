/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['next/core-web-vitals'],
  overrides: [
    {
      files: ['**/__tests__/**/*.{ts,tsx}', '**/*.test.{ts,tsx}'],
      env: {
        jest: true,
      },
      plugins: ['jest', 'testing-library'],
      extends: ['plugin:jest/recommended', 'plugin:testing-library/react'],
      parserOptions: {
        project: './tsconfig.jest.json',
      },
    },
  ],
};
