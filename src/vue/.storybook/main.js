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
    // Define global constants that can be accessed in your stories/ components
    config.plugins.push(
      new webpack.DefinePlugin({
        SERVER: process.env.GH_PAGES ? JSON.stringify('/frontend/') : JSON.stringify('/'),
      })
       
    );
    
     config.module.rules.push({
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
     });
    
   return(config);
  },
};

