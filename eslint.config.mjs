import { eslint } from "@eslint/js";

import { typescript } from '@typescript-eslint/eslint-plugin';
import { parse } from '@typescript-eslint/parser';

export default[
  eslint.configs.recommended,
  {
    "files": ["*.ts"],
    "extends": [
      "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "project": "./tsconfig.json"
    }
  }

];
const config = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  globals: {
    figma: 'readonly'
  },
  rules: {
    "no-console": "warn",
    "no-unused-vars": "off",
    "indent": ["error", 2],
  },
};
