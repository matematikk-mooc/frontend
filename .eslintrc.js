module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended', // Recommended ESLint rules
    'plugin:vue/vue3-recommended', // Vue.js recommended rules
    'plugin:jquery/deprecated', // jQuery rules
  ],
  plugins: [
    'vue',
    'jquery',
  ],
  rules: {
    // Add your specific rules here
    // For example, to allow console.log in development:
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  overrides: [
    {
      files: ['**/*.scss', '**/*.less', '**/*.sass', '**/*.css'],
      extends: ['stylelint-config-standard'], // You may need to install stylelint
      plugins: ['stylelint'],
    },
  ],
};
