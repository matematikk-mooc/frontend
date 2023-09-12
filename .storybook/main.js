/** @type { import('@storybook/vue3-webpack5').StorybookConfig } */
const webpack = require("webpack");
const path = require("path");
const config = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "storybook-addon-sass-postcss",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue3-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: [path.resolve(__dirname, "../dist")],
  webpackFinal: async (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        SERVER: JSON.stringify("http://localhost:6006/"),
      })
    );
    return config;
  },
};

export default config;
