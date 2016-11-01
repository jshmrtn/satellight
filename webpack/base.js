/* jshint node: true */
/* eslint-env node */

'use strict';

let path = require('path'),
    autoprefixer = require('autoprefixer'),
    rootPath = path.join(__dirname, '../'),
    distPath = path.join(rootPath, 'dist'),
    srcPath = path.join(rootPath, 'src'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    noInfo: true,
    context: rootPath,
    entry: path.join(srcPath, 'scripts/main.js'),
    output: {
        path: distPath,
        publicPath: '/',
        filename: '[hash].js',
        chunkFilename: '[hash]/js/[id].js',
        hotUpdateMainFilename: '[hash]/update.json',
        hotUpdateChunkFilename: '[hash]/js/[id].update.js',
    },
    recordsOutputPath: path.join(distPath, '/records.json'),
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: [
                        'es2015',
                    ],
                },
            },
            {
                test: /angular-hal[\/\\].*\.js$/,
                loader: 'babel',
                query: {
                    presets: [
                        'es2015',
                    ],
                },
            },
            {
                test: /\.css/,
                loader: 'style!css?sourceMap!postcss',
            },
            {
                test: /\.less$/,
                loader: 'style!css?sourceMap!postcss!less?sourceMap',
            },
            {
                test: /\.(sass|scss)$/,
                loader: 'style!css?sourceMap!postcss!sass?sourceMap',
            },
            {
                test: /\.(jpe?g|gif|png|ico)$/,
                loader: 'url?prefix=img/&limit=5000',
            },
            {
                test: /\.woff2?$/,
                loader: 'url?prefix=font/&limit=5000',
            },
            {
                test: /\.(eot|ttf|svg)$/,
                loader: 'file?prefix=font/',
            },
            {
                test: /\.html$/,
                loader: 'ngtemplate?relativeTo=' + srcPath + '/!html?interpolate',
            },
            {
                test: /\.json$/,
                loader: 'json',
            },
            {
                test: /jquery\.js$/,
                loader: 'expose?$',
            },
            {
                test: /jquery\.js$/,
                loader: 'expose?jQuery',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'html?interpolate!./src/views/index.ejs',
        }),
        new ExtractTextPlugin('[hash].css'),
    ],
    postcss: function() {
        return [
            autoprefixer({
                browsers: [
                    'last 10 versions',
                ],
            }),
        ];
    },
};
