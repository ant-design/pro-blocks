const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.default,
  rules: {
    ...fabric.default.rules,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/class-name-casing': 0,
    'import/no-extraneous-dependencies': 0,
  },
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
};
