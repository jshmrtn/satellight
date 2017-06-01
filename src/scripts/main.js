// Import dependencies
import $ from 'jquery';

// Import Stylesheets
import '../styles/main.scss';

// Import self executing files
import './ios-zoom-bugfix';

var SATELLIGHT = {
    // All pages
    common: {
        init: function() {

            var _gaq = _gaq || [];

        },
    },
};

var UTIL = {
    fire: function(func, funcname, args) {
        var namespace = SATELLIGHT;
        funcname = (funcname === undefined) ? 'init' : funcname;
        if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
            namespace[func][funcname](args);
        }
    },
    loadEvents: function() {
        UTIL.fire('common');
        $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
            UTIL.fire(classnm);
        });
    },
};

$(document).ready(UTIL.loadEvents);
