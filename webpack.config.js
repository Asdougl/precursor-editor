const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const DotenvWebpackPlugin = require('dotenv-webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

/** @type {import('webpack').Configuration} */
module.exports = {
    devtool: 'source-map',
    entry: ['react-hot-loader/patch', path.join(__dirname, 'src', 'index.tsx')],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(t|j)sx?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[contenthash].[ext]',
                        outputPath: 'images'
                    }
                }
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[contenthash].[ext]',
                        outputPath: 'fonts',
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js','.ts','.jsx','.tsx','.css']
    },
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html')
        }),
        new DotenvWebpackPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        stats: 'minimal',
        overlay: true,
        port: 8080,
        open: true,
    }
}