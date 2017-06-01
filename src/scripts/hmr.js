/* jshint node: true */
/* eslint-env node */

// Do HMR for views

const viewContext = require.context('!!file-loader!../views', true, /\.njk$/);

for (let file of viewContext.keys()) {
    viewContext(file);
}
