import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import {fixupConfigRules} from "@eslint/compat";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";

export default [

  {
    /*extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'airbnb',
      'airbnb-typescript',
      'plugin:prettier/recommended'
    ],*/
    // ignorePatterns: ['dist', '.eslintrc.cjs'],
    // parser: '@typescript-eslint/parser',
    plugins: {
      'prettier': eslintPluginPrettier,
      'react-refresh': eslintPluginReactRefresh,
    },
  },

  // Configure global variables for browser environment
  {languageOptions: {globals: globals.browser}},

  // Use recommended JavaScript rules
  pluginJs.configs.recommended,

  // Use recommended TypeScript rules
  ...tseslint.configs.recommended,

  // Fix configuration rules for React plugin compatibility
  ...fixupConfigRules(pluginReactConfig),

  // Merge custom ESLint rules here if needed

  // Custom rules from .eslintrc.cjs
  {
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        {allowConstantExport: true},
      ],
      'react/react-in-jsx-scope': 'off',
      'no-console': 'error',
      // Add other custom rules from .eslintrc.cjs here
    },
  },
];
