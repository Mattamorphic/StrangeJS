# ipify! :office: #

Ever wanted to convert a decimal to an ip address and vica versa? No? Well, you can anyway with ipify! Use with whatever module bundler you want, as long as they're supported.

## Usage ##
### toIP ###
Convert a decimal number to an ip address.
```javascript

console.log(ipify.toIP(3232235433));
// outputs "192.167.255.169"

```

### fromIP ###
Convert an ip address to a decimal number.
```javascript

console.log(ipify.fromIP("192.167.255.169"));
// outputs 3232235433

```

## Module Usage ##
### Browserify & Webpack ###
```javascript

var ipify = require('ipify');

console.log(ipify.fromIP("192.167.255.169"));

```

### RequireJS ###
```javascript

requirejs( [
  'path/to/ipify.js',
], function( ipify ) {
  console.log(ipify.fromIP("192.167.255.169"));
});

```

## Compliancy ##

ES2016 - Arrow functions and ES6 methods

## Contributor ##

Louie Colgan <ljbc94@gmail.com>
