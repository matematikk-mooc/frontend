const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env) => {
    return {
        entry: {
            // ...other entry points...
            'rootaccount-udirdesign': [
                './src/js/settingsRoot.js',
                './src/js/utilRoot.js',
                './src/js/rootaccount.js',
            ],

            'subaccount-udirdesign': [
                './src/js/settingsRoot.js',
                './src/js/utilRoot.js',
                './src/js/subaccount.js',
            ],
            'kompetanseportal-udirdesign': [
                './src/js/i18n.js',
                './src/js/main.js',
            ],
            'badgesave': [
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
                'DESIGNCSS' : JSON.stringify('subaccount-udirdesign-' + env.timestamp + '.css'),
                'DESIGNJS' : JSON.stringify('kompetanseportal-udirdesign-' + env.timestamp + '.js'),
                'SERVER': JSON.stringify('https://kompetanseudirno.azureedge.net/udirdesign/'),
                'KPASAPIURL': JSON.stringify('https://kpas.kompetanse.udir.no/api'),
                'ACCOUNTID' : [99, 100, 102, 103, 137, 138, 139, 145],
                'KPAS_MERGE_LTI_ID' : 845,
                'KPAS_IFRAME_VERSION' : JSON.stringify('production'),
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
            ],
        },
        resolve: {
            alias: {
                setup: path.resolve(__dirname, 'src/css/setup'),
                Handlebars: path.resolve('src/3party/handlebars-v1.3.0.js')
            },
            extensions: ['.js', '.hbs'],
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
