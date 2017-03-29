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
    context: rootPath,
    entry: {
        main: [
            path.join(srcPath, 'scripts/main.js'),
            require.resolve('babel-polyfill'),
            'modernizr',
        ],
    },
    resolve: {
        alias: {
            src: srcPath,
            modernizr$: path.resolve(rootPath, '.modernizrrc.json'),
            sinon$: 'sinon/pkg/sinon',
        },
    },
    devtool: 'source-map',
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
        rules: [
            {
                test: /\.modernizrrc\.json$/,
                use: [
                    { loader: 'modernizr-loader' },
                    { loader: 'json-loader' },
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            env: {
                                test: {
                                    plugins: [
                                        'istanbul',
                                    ],
                                },
                            },
                            presets: [
                                [ 'es2015', { modules: false }],
                                'es2016',
                                'es2017',
                            ],
                            plugins: [
                                'transform-runtime',
                                'transform-es2015-destructuring',
                                'transform-object-rest-spread',
                                'syntax-dynamic-import',
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.css/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    publicPath: '/',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        autoprefixer({
                                            browsers: [
                                                'last 10 versions',
                                            ],
                                        }),
                                    ];
                                },
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    publicPath: '/',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        autoprefixer({
                                            browsers: [
                                                'last 10 versions',
                                            ],
                                        }),
                                    ];
                                },
                            },
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: true,
                                globalVars: {
                                    'style-path': './src/styles',
                                },
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    publicPath: '/',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        autoprefixer({
                                            browsers: [
                                                'last 10 versions',
                                            ],
                                        }),
                                    ];
                                },
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                globalVars: {
                                    'style-path': './src/styles',
                                },
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.(jpe?g|gif|png|ico)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            prefix: 'img/',
                            limit: 5000,
                        },
                    },
                ],
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            prefix: 'font/',
                            limit: 5000,
                            mimetype: 'application/font-woff',
                        },
                    },
                ],
            },
            {
                test: /\.(ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
                exclude: [
                    path.join(srcPath, 'icons'),
                ],
            },
            {
                test: /\.(njk|nunjucks)$/,
                use: [
                    {
                        loader: 'nunjucks-html-loader',
                        options: {
                            'searchPaths': [
                                'src/views',
                                'src/views/layouts',
                            ],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body',
            template: 'html-loader?interpolate!nunjucks-html-loader!' + path.resolve(srcPath, 'views/index.njk'),
        }),
    ],
};
