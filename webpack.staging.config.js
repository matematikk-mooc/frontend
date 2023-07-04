const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env) => {
    if(env.timestamp == null){
        console.log("run with --env --timestamp=<date>")
        return null;
    }
    return {
        entry: {
            // ...other entry points...
            'rootaccount-udirdesign-staging': [
                './src/js/settingsRoot.js',
                './src/js/utilRoot.js',
                './src/js/rootaccount.js',
            ],

            'subaccount-udirdesign-staging': [
                './src/js/settingsRoot.js',
                './src/js/utilRoot.js',
                './src/js/subaccount.js',
            ],
            'kompetanseportal-udirdesign-staging': [
                './src/js/i18n.js',
                './src/js/main.js',
            ],
            'badgesafe': [
                './src/addons/badges/js/main.js',
                './src/js/modules/template.js',
                './src/js/modules/util.js',
                './src/js/i18n.js',
                './src/js/settings.js',
            ],
        },

        output: {
            filename: '[name]-' + env.timestamp +'.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ['dist', 'tmp', 'babel', 'replace'],
                cleanAfterEveryBuildPatterns: ['dist/*.js.map'],

            }),
            new webpack.DefinePlugin({
                'DESIGNCSS' : JSON.stringify('subaccount-udirdesign-staging-' + env.timestamp + '.css'),
                'DESIGNJS' : JSON.stringify('kompetanseportal-udirdesign-staging-' + env.timestamp + '.js'),
                'SERVER': JSON.stringify('https://kompetanseudirno.azureedge.net/udirdesign-staging/'),
                'KPASAPIURL': JSON.stringify('https://kpas.staging.kompetanse.udir.no/api'),
                'ACCOUNTID' : [99, 100, 102, 103, 137, 138, 139, 145],
                'KPAS_MERGE_LTI_ID' : 863,
                'KPAS_IFRAME_VERSION' : JSON.stringify('staging'),
            }),
            new MiniCssExtractPlugin({
                filename: '[name]-' + env.timestamp +'.css', // Output CSS filenames
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
                        {
                            loader: 'css-loader',
                            options: {
                                url: false
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                lessOptions: {
                                    relativeUrls: false,
                                    globalVars: {
                                        SERVER: JSON.stringify('https://kompetanseudirno.azureedge.net/udirdesign-staging/'),

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

        performance:{
            maxEntrypointSize: 500000,
            maxAssetSize: 500000

        },

        optimization: {
            minimize: true,
            minimizer: [
                new CssMinimizerPlugin(),
                new TerserPlugin(
                    {
                        parallel: true,
                        extractComments: false
                    }
                )
            ],
        },
    }
};