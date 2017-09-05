var path = require('path');
var webpack = require('webpack');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var htmlWebpackPlugin = require('html-webpack-plugin');
var vuxLoader = require('vux-loader');

var webpackConfig = {
    entry: {
        app: path.join(__dirname, '../src/index.js')
    },
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: './',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {}
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]'
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    performance: {
        hints: false
    },
    devtool: 'eval-source-map',
    plugins: [
        new FriendlyErrorsPlugin(),
        new htmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.SourceMapDevToolPlugin()
    ]
};

module.exports = webpackConfig;