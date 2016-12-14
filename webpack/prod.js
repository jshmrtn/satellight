/* jshint node: true */
/* eslint-env node */

'use strict';

var baseConfig = require('./base'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    webpack = require('webpack');

baseConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
}));

// Apply Extractor to every css loader
baseConfig.module.loaders = baseConfig.module.loaders.map((loader) => {
    if ('test.css'.match(loader.test) ||
        'test.less'.match(loader.test) ||
        'test.scss'.match(loader.test) ||
        'test.sass'.match(loader.test)) {
        let nakedLoader = loader.loader.split('!').slice(1).join('!');
        loader.loader = ExtractTextPlugin.extract('style', nakedLoader);
    }
    return loader;
});

module.exports = baseConfig;
