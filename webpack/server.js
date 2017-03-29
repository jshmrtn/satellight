/* jshint node: true */
/* eslint-env node */

'use strict';

// Hostname of the Setup
const HOSTNAME = 'localhost';

// Url where the webpack server is running
const APP_URL = 'http://' + HOSTNAME + ':3100';

const
    baseConfig = require('./dev'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
    webpack = require('webpack'),
    DashboardPlugin = require('webpack-dashboard/plugin');

baseConfig.entry.main = baseConfig.entry.main.concat([
    'webpack-dev-server/client?http://localhost:3100/',
    'webpack/hot/dev-server',
]);

baseConfig.output.filename = '[name].[hash].js';

const browserSync = new BrowserSyncPlugin(
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
baseConfig.plugins.push(new DashboardPlugin());
baseConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
baseConfig.plugins.push(new webpack.NamedModulesPlugin());

module.exports = baseConfig;
