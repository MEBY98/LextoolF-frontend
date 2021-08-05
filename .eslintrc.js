module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    '@typescript-eslint/explicit-module-boundary-types': 0,
    semi: 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/prefer-const': 0,
    'vue/no-unused-components': 0,
    'vue/valid-template-root': 0,
    'vue/require-default-prop': 0,
    'vue/no-v-html': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'prefer-const': 0,
  },
  // overrides: [{
  //   "files": ["*.js", "*.ts"],
  //   "rules": {
  //     "typescript/no-var-requires": "off"
  //   }
  // }]
};
