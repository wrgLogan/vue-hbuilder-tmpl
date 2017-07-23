var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('./webpack.prod.config.js');
var webpackMiddleware = require('webpack-dev-middleware-hard-disk');

var compiler = webpack(webpackConfig)

webpackMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})