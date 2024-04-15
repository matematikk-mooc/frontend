const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');

module.exports = (env) => {

    return {
        entry: {
            // ...other entry points...
            "rootaccount-udirdesign": [
                "./src/js/settingsRoot.js",
                "./src/js/utilRoot.js",
                "./src/js/rootaccount.js",
            ],

            "subaccount-udirdesign": [
                "./src/js/settingsRoot.js",
                "./src/js/utilRoot.js",
                "./src/js/subaccount.js",
            ],
            "kompetanseportal-udirdesign": [
                "./src/js/3party/matomo.js",
                "./src/js/main.js",
            ],
        },

        output: {

            filename: "[name]-" + env.timestamp +".js",
            path: path.resolve(__dirname, "dist"),
        },
        plugins: [
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ["dist", "tmp", "babel", "replace"],
                cleanAfterEveryBuildPatterns: ["dist/*.js.map"],
            }),
            new webpack.DefinePlugin({
                VUECSS: JSON.stringify("index.css"),
                DESIGNCSS : JSON.stringify(
                    "kompetanseportal-udirdesign-" + env.timestamp + ".css"
                    ),
                DESIGNJS : JSON.stringify(
                    "kompetanseportal-udirdesign-" + env.timestamp + ".js"
                    ),
                SERVER: JSON.stringify(
                    "https://kompetanseudirno.azureedge.net/frontend-master/"
                    ),
                KPASAPIURL: JSON.stringify(
                    "https://kpas.kompetanse.udir.no/api"
                    ),
                ACCOUNTID: [99, 100, 102, 103, 137, 138, 139, 145],
                KPAS_MERGE_LTI_ID: 845,
                KPAS_IFRAME_VERSION: JSON.stringify("production"),
                __VUE_OPTIONS_API__: "true",
                __VUE_PROD_DEVTOOLS__: "false",
            }),
            new MiniCssExtractPlugin({
                filename: "[name]-" + env.timestamp + ".css", // Output CSS filenames
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: "src/vue/assets/",
                        to: ".",
                    },
                    {
                        from: "src/bitmaps/",
                        to: "bitmaps/",
                    },
                    {
                        from: "src/vector_images/",
                        to: "vector_images/",
                    },
                    {
                        from: "kpas/",
                        to: "kpas/",
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
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                        },
                    },
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        {
                            loader: "sass-loader",
                            options: {
                                additionalData:
                                "$urlToFile: " +
                                `"https://kompetanseudirno.azureedge.net/frontend-master/"` +
                                ";",
                            },
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.vue$/,
                    loader: "vue-loader",
                    options: {
                        extractCSS: true,
                    },
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            alias: {
                setup: path.resolve(__dirname, "src/css/setup"),
                vue$: path.resolve("node_modules/vue/dist/vue.esm-bundler.js"),
            },
            extensions: [".js", ".vue"],
            preferRelative: true,
            modules: ["src", "node_modules"],
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
