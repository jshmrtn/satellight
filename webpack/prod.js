/* jshint node: true */
/* eslint-env node */

'use strict';
const
    baseConfig = require('./base'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    webpack = require('webpack'),
    WebpackCleanupPlugin = require('webpack-cleanup-plugin');

baseConfig.plugins.push(new webpack.LoaderOptionsPlugin({
    minimize: true,
}));
baseConfig.plugins.push(new WebpackCleanupPlugin());
baseConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress: {
        warnings: false,
    },
    sourceMap: true,
}));

baseConfig.plugins.push(new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: '"production"',
    },
}));

baseConfig.plugins.push(new ExtractTextPlugin({
    filename: '[hash].css',
    allChunks: true,
    disable: false,
}));

module.exports = baseConfig;
