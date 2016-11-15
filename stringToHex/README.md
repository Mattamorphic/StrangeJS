# String To Hex :pencil: #

String to hex is a simple module that has one convert method used to convert a string to an array of hexadecimal colour references.

## Usage ##

```javascript

var stringToHex = require('./stringToHex.js')

stringToHex.convert('The big red Toast Machine!').forEach(c => {
    let div = document.createElement('div')
    div.style.backgroundColor = c
    div.style.width = '100px'
    div.style.height = '100px'
    document.getElementsByTagName('body')[0].appendChild(div)
})

```

The above will create a new div for each colour it derives

## Compliancy ##

ES2016 - Arrow functions and ES6 methods

## Contributor ##

Matt Barber <mfmbarber@gmail.com>
