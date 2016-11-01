/* jshint node: true */
/* eslint-env node */

'use strict';

let baseConfig = require('./base'),
    _ = require('lodash'),
    path = require('path'),
    rootPath = path.join(__dirname, '../'),
    distPath = path.join(rootPath, 'dist');

if(process.env.OUTPUT_PATH) {
    baseConfig.output.publicPath = process.env.OUTPUT_PATH;
}

module.exports = _.merge({}, baseConfig, {
    devtool: 'eval',
    cache: true,
    devServer: {
        noInfo: true,
        contentBase: distPath,
        hot: true,
        watchOptions: {
            aggregateTimeout: 100,
            poll: 100,
        },
        publicPath: baseConfig.output.publicPath,
    },
    module: {
        devtool: 'eval',
    },
});
