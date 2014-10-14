/*jslint node: true */
'use strict';
(function () {
    var $ = require("jQuery");
    var isotope = require("isotope");

    var $container = $('#container');
    $container.isotope({
        itemSelectors: '.item',
        masonry: {
            columnWidth: 50
        }
    });
})();
