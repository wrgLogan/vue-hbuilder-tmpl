var path = require('path');
var webpack = require('webpack');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: path.join(__dirname, '../src/index.js'),
        vendor: ['jquery']
    },
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: './',
        filename: '[name].js',
        chunkFilename: 'chunk/[id].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            fallback: 'style-loader',
                            use: 'css-loader'
                        })
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
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
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),  // 压缩
        new webpack.optimize.CommonsChunkPlugin({  // 合并
            name: 'vendor',
            filename: "vendor.js"
        }),
        new ExtractTextPlugin({
            filename: 'css/[id].[chunkhash].css'
        }),
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

