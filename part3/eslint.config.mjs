import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import stylisticJs from '@stylistic/eslint-plugin'

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 1. Base Recommended Rules
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  // 2. Main Configuration
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    settings: {
      react: {
        version: 'detect', // Automatically finds your React version
      },
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node, // For Backend (process, __dirname)
        ...globals.browser, // For Frontend (window, document)
      },
    },
    rules: {
      // Style Rules (Single quotes, no semis)
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      '@stylistic/js/linebreak-style': 'off', // Prevents Windows CRLF errors

      // Coding Rules
      '@typescript-eslint/no-require-imports': 'off', // Allows backend require()
      'react/react-in-jsx-scope': 'off', // Not needed in modern React
      'no-unused-vars': 'warn',
      'no-console': 'off', // Useful for backend logs
    },
  },

  // 3. IGNORE DIST FOLDER
  {
    ignores: ['dist/**', 'node_modules/**', 'build/**'],
  },
]
