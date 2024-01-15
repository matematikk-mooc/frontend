module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended', // Use the recommended Vue.js rules
    'eslint:recommended',
    'plugin:jquery/recommended',
    'prettier' // Enable ESLint and Prettier integration
  ],
  plugins: ['vue', 'prettier',],
  rules: {
    semi: ['error', 'always']
  },
  // Prettier-specific options
  overrides: [
    {
      files: ['*.vue', '*.scss'], // Apply Prettier to Vue and SCSS files
      options: {
        // Prettier options specific to Vue and SCSS files
        singleQuote: true,
        htmlWhitespaceSensitivity: 'css',
        vueIndentScriptAndStyle: true,
        tabWidth: 2,
        semi: true,
        useTabs: false,
        trailingComma: 'none',
        scss: true
      }
    }
  ]
};
