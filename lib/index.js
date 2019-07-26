'use strict';

const debug = require('debug');
const { package: pkg } = require('read-pkg-up').sync();

/**
 * @param {String} namespace
 * @param {Object} options
 * @returns {function(...[*])}
 */
module.exports = (namespace, options = { prefix: true }) => {

    /**
     * @function
     * @params {...*}
     * @property {Boolean} enabled
     */

    const prefixes = [namespace];

    if (options.prefix) {
        prefixes.unshift(pkg.name);
    }

    const _debug = debug(prefixes.join(':'));

    return (...args) => {

        // don't do anything if debug is turned off for this namespace
        if (_debug.enabled) {

            // call the original debug method after obtaining the result of any functions
            return _debug(...args.map(arg => {
                if (typeof arg === 'function') {
                    return arg();
                } else {
                    return arg;
                }
            }));
        }
    };

};
