module.exports = {
  root: true,
  extends: ['next/core-web-vitals', 'plugin:testing-library/react'],
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      env: {
        jest: true,
      },
      globals: {
        expect: 'readonly',
        test: 'readonly',
        describe: 'readonly',
      },
      parserOptions: {
        project: './tsconfig.jest.json', // 👈 key line
      },
    },
  ],
};
