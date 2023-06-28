const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {

    entry: {
        // ...other entry points...
        'rootaccount-localhost': [
            './src/js/settingsRoot.js',
            './src/js/utilRoot.js',
            './src/js/rootaccount.js',
        ],

        'subaccount-localhost': [
            './src/js/settingsRoot.js',
            './src/js/utilRoot.js',
            './src/js/subaccount.js',
        ],
        'mmooc-min-localhost': [
            './src/js/i18n.js',
            './src/js/main.js',
            ...glob.sync('./src/templates/modules/*.hbs'),
            ...glob.sync('./src/js/3party/*.js'),
            ...glob.sync('./src/js/api/*.js'),
            ...glob.sync('./src/js/modules/*.js'),
            ...glob.sync('./src/js/utilities/*.js'),
        ],
        'badges-dev': [
            'handlebars/dist/handlebars.min.js',
            ...glob.sync('./src/addons/badges/js/*.js'),
            './src/js/modules/template.js',
            './src/js/modules/util.js',
            './src/js/i18n.js',
            './src/js/settings.js',
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
            'DESIGNCSS' : JSON.stringify('mmooc-min-localhost.css'),
            'DESIGNJS' : JSON.stringify('mmooc-min-localhost.js'),
            'SERVER': JSON.stringify('http://localhost:9000/'),
            'KPASAPIURL': JSON.stringify('https://kpas.staging.kompetanse.udir.no/api'),
            'ACCOUNTID' : [99, 100, 102, 103, 137, 138, 139, 145],
            'KPAS_MERGE_LTI_ID' : 863,
            'KPAS_IFRAME_VERSION' : JSON.stringify('localhost'),
          }),
        new MiniCssExtractPlugin({
            filename: '[name].css', // Output CSS filenames
        }),
        new CopyWebpackPlugin({
            patterns: [
              {
                from: 'src/bitmaps/*',
                to: 'bitmaps/[name][ext]'
              },
              {
                from: 'src/vector_images/*',
                to: 'vector_images/[name][ext]'
              },
              {
                from: 'kpas/*',
                to: 'kpas/[name][ext]'
              }
            ]
        }),
        new webpack.HotModuleReplacementPlugin(),
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
                    },
                },
            },
            {
                test: /\.hbs$/,
                loader:'handlebars-loader',
                options: {
                    helperDirs: path.resolve(__dirname, 'src/js/modules/template.js'),
                    precompileOptions: {
                        knownHelpersOnly: false
                    },
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader',
                    options: {
                        url: false
                    }
                    },
                     {loader: 'less-loader',
                    options: {
                        lessOptions: {
                        relativeUrls: false,
                        globalVars: {
                            SERVER: JSON.stringify('http://localhost:9000/'),

                        },
                        }
                    }
                    },
                ],
            }
        ],
    },
    resolve: {
        alias: {
            setup: path.resolve(__dirname, 'src/css/setup'),
            Handlebars: path.resolve('src/3party/handlebars-v1.3.0.js')
        },
        extensions: ['.js', '.less', '.hbs'],
        preferRelative: true,
        modules: ["src", "node_modules"],

    },

    optimization: {
        // minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
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
            directory: path.resolve(__dirname, 'dist')
        },
        port: 9000,
        host: 'localhost',
        open: true,
        allowedHosts: 'all',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        watchFiles: {
        paths: ['src'],
        options: {
          ignored: '**/*.js', // Exclude JavaScript files from triggering a full reload
        },
      },
    }
};
