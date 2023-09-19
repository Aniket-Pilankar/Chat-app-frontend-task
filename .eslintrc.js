module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['react-app', 'react-app/jest', 'plugin:import/typescript'],
  plugins: ['simple-import-sort', 'import'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  rules: {
    quotes: ['error', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
    camelcase: ['warn', { properties: 'always' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          ['^\\u0000'], // Side effect
          ['^react'], // react packages
          ['^@\\w'], // scoped packages
          ['^'], // other third party packages
          ['^\\.'], // first party packages
        ],
      },
    ],
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useWarnBeforeWindowClose)',
      },
    ],
  },
}
