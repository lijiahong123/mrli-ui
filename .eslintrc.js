module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaFeatures: {
      // open the `decorators` function
      legacyDecorators: true,
    },
  },
  //    'arrow-parens': ['error', 'as-needed'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': 'off',
    'no-underscore-dangle': 'off',
    'no-unreachable': 'off',
    'generator-star-spacing': 'off',
    'import/no-extraneous-dependencies': 'off',
    'array-callback-return': 'off',
    'no-useless-escape': 'off',
    'no-confusing-arrow': 'off',
    'consistent-return': 'off',
    'no-debugger': 'warn',
    'no-plusplus': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/label-has-for': 'off',
    'comma-dangle': 0,
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'import/prefer-default-export': 'off',
    'implicit-arrow-linebreak': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'arrow-parens': 0,
    'prettier/prettier': 'off',
  },
};

