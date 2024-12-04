const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: {
    'theme-localhost': [
      './src/js/settingsRoot.js',
      './src/js/account-theme.js',
    ],
    'kompetanseportalen-localhost': [
      './src/js/3party/matomo.js',
      './src/js/main.js',
    ],
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  devtool: 'eval-cheap-module-source-map',
  cache: {
    type: 'filesystem',
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['dist', 'tmp', 'babel', 'replace'],
      cleanAfterEveryBuildPatterns: ['dist/*.js.map'],
    }),
    new webpack.DefinePlugin({
      DESIGNCSS: JSON.stringify('kompetanseportalen-localhost.css'),
      DESIGNJS: JSON.stringify('kompetanseportalen-localhost.js'),
      SERVER: JSON.stringify('http://localhost:9000/'),
      KPASAPIURL: JSON.stringify('https://kpas.staging.kompetanse.udir.no/api'),
      ACCOUNTID: [99, 100, 102, 103, 137, 138, 139, 145],
      KPAS_MERGE_LTI_ID: 863,
      KPAS_IFRAME_VERSION: JSON.stringify('localhost'),
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css', // Output CSS filenames
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/vue/assets/',
          to: '.',
        },
        {
          from: 'src/bitmaps/',
          to: 'bitmaps/',
        },
        {
          from: 'src/vector_images/',
          to: 'vector_images/',
        },
        {
          from: 'kpas/',
          to: 'kpas/',
        },
      ],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      // Add loaders for different file types
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: '$urlToFile: ' + `'http://localhost:9000/'` + ';',
              api: 'modern',
              sassOptions: {
                silenceDeprecations: [
                  'mixed-decls',
                  'color-functions',
                  'global-builtin',
                  'import',
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true,
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    symlinks: false,
    alias: {
      setup: path.resolve(__dirname, 'src/css/setup'),
      vue$: path.resolve(
        __dirname,
        'node_modules/vue/dist/vue.runtime.esm-bundler.js',
      ),
    },
    extensions: ['.js', '.vue'],
    preferRelative: true,
    modules: ['src', 'node_modules'],
  },

  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true,
        extractComments: false,
      }),
    ],
  },

  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: false,
      },
    },
    static: {
      directory: path.resolve(__dirname, 'dist'),
      watch: {
        ignored: /node_modules/,
      },
    },
    port: 9000,
    host: 'localhost',
    hot: true,
    open: false,
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    watchFiles: {
      paths: ['src'],
      options: {
        ignored: '**/*.js', // Exclude JavaScript files from triggering a full reload
      },
    },
  },
};
