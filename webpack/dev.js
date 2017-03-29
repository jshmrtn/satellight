/* jshint node: true */
/* eslint-env node */

'use strict';

let baseConfig = require('./base'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    _ = require('lodash'),
    path = require('path'),
    rootPath = path.join(__dirname, '../'),
    distPath = path.join(rootPath, 'dist'),
    webpack = require('webpack');

if(process.env.OUTPUT_PATH) {
    baseConfig.output.publicPath = process.env.OUTPUT_PATH;
}

baseConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());

baseConfig.plugins.push(new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: '"development"',
    },
}));

baseConfig.plugins.push(new ExtractTextPlugin({
    filename: '[hash].css',
    allChunks: true,
    disable: true,
}));

module.exports = _.merge({}, baseConfig, {
    cache: true,
    devServer: {
        noInfo: true,
        contentBase: distPath,
        hot: true,
        publicPath: baseConfig.output.publicPath,
    },
});
