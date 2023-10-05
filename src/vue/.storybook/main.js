const webpack = require("webpack");
const path = require("path");
const fs = require("fs");

// Define possible base directories
const possibleBaseDirectories = ["/frontend/", "/"];

// Function to find the first existing base directory
function findExistingBaseDirectory() {
  for (const baseDir of possibleBaseDirectories) {
    if (fs.existsSync(baseDir)) {
      console.error('base dir is: ', baseDir);
      return baseDir;
    }
  }
  // If none of the directories exist, default to "/"
  return "/";
}
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
        SERVER: JSON.stringify(findExistingBaseDirectory()),
      })
    );
    
   return(config);
  },
};

