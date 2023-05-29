module.exports = {
  root: true,
  plugins: ['@typescript-eslint', 'import', 'prettier', 'react'],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'react/function-component-definition': 'off',
    'react/react-in-jsx-scope': 'off',
    'consistent-return': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'react/require-default-props': 'off',
  },
};
