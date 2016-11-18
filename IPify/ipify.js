/**
 * @description ipify! - Converts a decimal number to an ip address, and back.
 * @author Louie Colgan <ljbc94@gmail.com>
 * @licence MIT
 *
 * Example usage: 
 * console.log(ipify.toIP(3232235433))
 * console.log(ipify.fromIP("192.167.255.169"))
 */
(function (root, factory) {
    
  if( typeof define === "function" && define.amd ) {
    define( ["ipify"], factory );
  } else if( typeof module === "object" && module.exports ) {
    module.exports = factory( require("ipify") );
  } else {
    root.ipify = factory( root.ipify );
  }
    
})(this, function() {
  
  const _place = 2, _maxBits = 32, _maxBytes = 4, _byte = 8;
  
  return {
    /**
     * @function
     * Convert a decimal number to an ip address.
     * @params { Number } value - The value to convert.
     * @returns { String | Error } The generated ip address or an error.
     */
    toIP: ( value ) => {
      if (value.toString(_place).length > _maxBits) {
          throw "Needs to be a valid ip address";
      }
      const ipadd = [];
      for ( let index = 0, max = 24; index < _maxBytes; index++ ) {
        var octet = (value >>> max).toString(_place).substr(_byte * index);
        ipadd.push(parseInt(octet, _place));
        max = max - _byte;
      }
      return ipadd.join('.');
    },
    
    /**
     * @function
     * Convert an ip address to a decimal.
     * @params { String } ip - The ip to convert.
     * @returns { Number } The generated value.
     */
    fromIP: ( ip ) => {
      const binary = ip
        .split('.')
        .map((add) => (+add).toString(_place))
        .join('');
      return parseInt(binary, _place);
    }
    
  };
  
});