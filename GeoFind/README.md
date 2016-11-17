# GeoFind :earth_africa: => :coffee: #

Always wondered just how far that coffee shop is, and how long it would take you to walk?
Now's your chances - harnessing the power of NodeJs and Googles Distance Matrix, and Nearby Places API
We can calculate just that - from your lat and long position - neat eh?

## Usage ##

Don't to forget the two environment variables for :
- GOOGLE_DISTANCE_MATRIX_KEY
- GOOGLE_NEARBY_KEY

```javascript

var stringToHex = require('./GeoFind.js')

GeoFind.get(50.7224013, -1.864844, 'pizza')
    .then(obj => console.log(obj))
    .catch(e => console.log(e))

```

## Compliancy ##

NodeJS 6+ and ES6
Uses Fetch, Request and String interpolation and Arrow Functions

## Dependancies ##
- es6-promise
- isomorphic-fetch

## Contributor ##
Matt Barber <mfmbarber@gmail.com>
