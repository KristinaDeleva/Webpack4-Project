const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                jquery: 'jquery/src/jquery',
            }
        },
        entry: {
            global: path.resolve(__dirname, 'src/scripts/views/global'),
            home: path.resolve(__dirname, 'src/scripts/views/home'),
            whyChooseUs: path.resolve(__dirname, 'src/scripts/views/whyChooseUs'),
            industries: path.resolve(__dirname, 'src/scripts/views/industries')
        },
        output: {
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [{
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: [
                            {
                                loader: 'cache-loader'
                            },
                            {
                                'loader': 'babel-loader',
                                options: {
                                    cacheDirectory: true
                                }
                            }
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash].[ext]',
                            context: path.resolve(__dirname, 'src/assets/images'),
                            outputPath: 'images',
                            publicPath: '../images',
                            useRelativePaths: true
                        }
                    }],
                },
                {
                    test: /\.(woff|woff2)$/i,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash].[ext]',
                            context: path.resolve(__dirname, 'src/assets/fonts'),
                            outputPath: 'fonts',
                            publicPath: '../fonts',
                            useRelativePaths: true
                        }
                    }],
                },
            ]
        },
        plugins: [
            new HardSourceWebpackPlugin(),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/views/index.html'),
                filename: 'index.html',
                title: 'Home',
                chunks: ['global', 'home']
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/views/whyChooseUs.html'),
                filename: 'whyChooseUs.html',
                title: 'Why Choose Us',
                chunks: ['global', 'whyChooseUs']
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/views/industries.html'),
                filename: 'industries.html',
                title: 'Industries',
                chunks: ['global', 'industries']
            })
        ]
}