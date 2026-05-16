const { defineConfig } = require('eslint/config');
const angular = require('angular-eslint');
const tseslintPlugin = require('@typescript-eslint/eslint-plugin');
const unicorn = require('eslint-plugin-unicorn').default;

module.exports = defineConfig([
  {
    ignores: ['cypress/**/*', 'projects/**/*'],
  },
  {
    files: ['**/*.ts'],
    extends: [...angular.configs.tsRecommended, unicorn.configs.recommended],
    processor: angular.processInlineTemplates,
    plugins: {
      '@typescript-eslint': tseslintPlugin,
    },
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json', 'cypress/tsconfig.json'],
      },
    },
    rules: {
      '@angular-eslint/component-class-suffix': [
        'error',
        {
          suffixes: ['Component', 'Page'],
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          prefix: 'app',
          style: 'kebab-case',
          type: 'element',
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          prefix: 'app',
          style: 'camelCase',
          type: 'attribute',
        },
      ],
      'unicorn/no-null': 'off',
      'unicorn/no-useless-undefined': 'off',
      'unicorn/prefer-global-this': 'off',
      'unicorn/prefer-ternary': 'off',
      '@angular-eslint/prefer-inject': 'off',
      '@angular-eslint/prefer-standalone': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            changeDetectorRef: true,
            iCalendarKey: true,
            iCalendarLink: true,
          },
        },
      ],
      '@typescript-eslint/no-floating-promises': ['error'],
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended],
    rules: {},
  },
]);
