import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintPluginReact from 'eslint-plugin-react';

const defaultConfig = [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];

//export default defaultConfig;

const reactConfig = {
  files: ['**/*.{js,jsx,ts,tsx}'],
  plugins: {
    react: eslintPluginReact,
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',  // Disable for React 17+ and higher
    'react/prop-types': 'off',          // Optional: if not using PropTypes
  },
};
//
//// Combine both configurations
export default [
  ...defaultConfig,
  reactConfig,
];
//
//