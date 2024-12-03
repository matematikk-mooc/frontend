const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const APP_ENV = process.env.APP_ENV || 'stage';
const APP_VERSION = process.env.APP_VERSION || 'ci_not_found';

const cdnBaseUrl =
  APP_ENV === 'stage'
    ? `https://st09417311stage-fybvhtameff0aney.z01.azurefd.net/themes/${APP_VERSION}/`
    : `https://st09417311prod-ahfvbhg8cbh4frf9.z01.azurefd.net/themes/${APP_VERSION}/`;
const apiBaseUrl =
  APP_ENV === 'stage'
    ? 'https://kpas.staging.kompetanse.udir.no/api'
    : 'https://kpas.kompetanse.udir.no/api';

module.exports = (env) => {
  return {
    entry: {
      'theme-udirdesign': [
        './src/js/settingsRoot.js',
        './src/js/account-theme.js',
      ],
      'kompetanseportal-udirdesign': [
        './src/js/3party/matomo.js',
        './src/js/main.js',
      ],
    },

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['dist', 'tmp', 'babel', 'replace'],
        cleanAfterEveryBuildPatterns: ['dist/*.js.map'],
      }),
      new webpack.DefinePlugin({
        VUECSS: JSON.stringify('index.css'),
        DESIGNCSS: JSON.stringify('kompetanseportal-udirdesign.css'),
        DESIGNJS: JSON.stringify('kompetanseportal-udirdesign.js'),
        SERVER: JSON.stringify(cdnBaseUrl),
        KPASAPIURL: JSON.stringify(apiBaseUrl),
        ACCOUNTID: [99, 100, 102, 103, 137, 138, 139, 145],
        KPAS_MERGE_LTI_ID: 845,
        KPAS_IFRAME_VERSION: JSON.stringify(APP_ENV),
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
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
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                additionalData: '$urlToFile: ' + `"${cdnBaseUrl}"` + ';',
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
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
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

    performance: {
      maxEntrypointSize: 1000000,
      maxAssetSize: 1000000,
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
  };
};
