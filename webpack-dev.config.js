const path = require('path');
const postCssPresetEnv = require('postcss-preset-env');
const merge = require('webpack-merge');
const common = require('./webpack-common.config');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    output: {
        filename: 'scripts/[name].js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'fast-sass-loader',
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
                    }
                ]
            },
        ]
    }
});