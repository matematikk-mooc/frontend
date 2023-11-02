module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended', // Use the recommended Vue.js rules
    'eslint:recommended',
    'prettier', // Enable ESLint and Prettier integration
  ],
  plugins: ['vue'],
  rules: {
    semi: ["error", "always"],
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        htmlWhitespaceSensitivity: "css",
        vueIndentScriptAndStyle: true,
        tabWidth: 2,
        semi: true,
        useTabs: false,
        trailingComma: "none",
        htmlWhitespaceSensitivity: "css",
        vueIndentScriptAndStyle: true,
        scss: true,
      },
    ],
  },
};
