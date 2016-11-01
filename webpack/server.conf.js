/* jshint node: true */
/* eslint-env node */

const CONTENT_BASE = 'dist/';

module.exports = {
    hot: true,
    inline: true,
    watch: true,
    publicPath: '/',
    contentBase: CONTENT_BASE,
    historyApiFallback: {
        index: '/index.html',
        rewrites: [
            {
                from: /^\/auth\/saml\/.*/,
                to: () => '/index.html',
            },
        ],
    },
};
