/* jshint node: true */
/* eslint-env node */

'use strict';

// Hostname of the Setup
const HOSTNAME = 'localhost';

// Url where the webpack server is running
const APP_URL = 'http://' + HOSTNAME + ':3100';

let baseConfig = require('./dev'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
    webpack = require('webpack'),
    browserSync;

baseConfig.entry = [
    baseConfig.entry,
    'webpack-dev-server/client?http://localhost:3100/',
    'webpack/hot/dev-server',
];

browserSync = new BrowserSyncPlugin(
    {
        proxy: {
            target: APP_URL,
        },
    },
    {
        // Let Webpack do the reloading
        reload: false,
    }
);

// Add Browsersync
baseConfig.plugins.push(browserSync);

baseConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = baseConfig;
