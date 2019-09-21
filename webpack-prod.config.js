const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postCssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');
const glob = require('glob');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const Critters = require('critters-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack-common.config');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: 'scripts/[name]-[chunkhash].js'
    },
    optimization: {
        runtimeChunk: 'single',
        moduleIds: 'hashed',
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true,
                    terserOptions: {
                        warnings: false,
                        output: {
                            comments: false,
                        },
                    },
            })
        ],
        splitChunks: {
            automaticNameDelimiter: '-',
              cacheGroups: {
                default: false,
                vendors: false,
                vendor: {
                    test: /node_modules/,
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss-2',
                            sourceMap: true,
                            minimize: true,
                            plugins: [
                                autoprefixer(),
                                cssnano()
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss-1',
                            sourceMap: true,
                            plugins: [
                                postCssPresetEnv(),
                            ]
                        }
                    },
                ]
            }
        ]
    },
    plugins: [
        new PurgecssPlugin({
            paths: glob.sync(`${path.resolve(__dirname, 'src')}/**/*`, {
                nodir: true
            })
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name]-[contenthash].min.css',
        }),
        // new Critters({
        //     preload: 'swap'
        // }),
        new BundleAnalyzerPlugin()
    ]
});