/**
 *
 * Simple JS Module that converts a string to an array of Hex codes
 * @description stringToHex
 * @author Matt Barber <mfmbarber@gmail.com>
 * @license MIT
 *
 * Example usage : console.log(stringToHex.convert('Toaster'));
**/
var stringToHex = (() => {
    'use strict'

    // How much to buffer up the images.
    const BUFF = 100;

    /**
     * Internal function that converts string to hex code (with added colour buffer)
     *
     * @private
     * @param string    string  The string to convert
     * @return array
    **/
    function makeHexArray(string) {
        return string.split('').map(e => (e.charCodeAt() + BUFF).toString(16))
    }

    return {
        /**
         * Converts a string to a set of hex colours
         *
         * @public
         * @param string    string  The string to convert
         *
         * @return array
        **/
        convert: (string) => {
            var hex = makeHexArray(string)
            // Add any missing hex numbers
            while (hex.length % 3 !== 0) { hex.push('00') }
            var colours = new Array();
            for (let i = 0; i < hex.length; i += 3) {
                colours.push('#' + hex[i] + hex[i+1] + hex[i+2]);
            }
            return colours

        }
    }
})();

module.exports = stringToHex;
