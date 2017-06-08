'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var debug = require('debug');
var pkg = require('read-pkg-up').sync().pkg;

/**
 * @param {String} namespace
 * @param {Object} options
 * @returns {function(...[*])}
 */
module.exports = function (namespace) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { prefix: true };


    /**
     * @function
     * @params {...*}
     * @property {Boolean} enabled
     */

    var prefixes = [namespace];

    if (options.prefix) {
        prefixes.unshift(pkg.name);
    }

    var _debug = debug(prefixes.join(':'));

    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        // don't do anything if debug is turned off for this namespace
        if (_debug.enabled) {

            // call the original debug method after obtaining the result of any functions
            return _debug.apply(undefined, _toConsumableArray(args.map(function (arg) {
                if (typeof arg === 'function') {
                    return arg();
                } else {
                    return arg;
                }
            })));
        }
    };
};