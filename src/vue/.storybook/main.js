const webpack = require("webpack");
const path = require("path");

module.exports = {
  stories: ["../**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-styling",
      options: {
        sass: {
          implementation: require("sass"),
        },
      },
    },
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
  staticDirs: [path.resolve(__dirname, "../assets")],
  webpackFinal: async (config) => {
    // Define global constants that can be accessed in your stories
    config.plugins.push(
      new webpack.DefinePlugin({
        SERVER: JSON.stringify("http://localhost:6006/"),
      })
    );
    
   return(config);
  },
};

