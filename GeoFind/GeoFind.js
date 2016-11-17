require('es6-promise').polyfill();
require('isomorphic-fetch')
var assert = require('assert')
/**
 *
 * A JS module that finds the closest thing based on your longitude and latitude
 * This relies on the google distances and places api - so you'll need those keys!
 *
 * @description Stuff Hunting
 * @author Matt Barber <mfmbarber@gmail.com>
 * @license MIT
 *
 * Example usage : GeoFind.get(50.7167, 1.8833).then(obj => console.log(obj)).catch(e => console.log(e));
**/

var GeoFind = ((env) => {
    /**
     * Encode an object into a query string
     *
     * @private
     *
     * @param object    data    The keys and values for the query parameters
     *
     * @return string
    **/
    function encodeQuery(data) {
        let ret = []
        for (let d in data) {
            ret.push(`${encodeURIComponent(d)}=${encodeURIComponent(data[d])}`)
        }
        return ret.join('&')
    }

    /**
     * Google API request, take the url and parameters - and form a get request
     * returns a promise
     *
     * @private
     *
     * @param string    url     The url to hit
     * @param object    params  Object represetning the GET query params
     *
     * @return promise
    **/
    function gAPIReq(url, params) {
        let request = new Request(`${url}?${encodeQuery(params)}`)
        return fetch(request).then(res => {
            if (res.status === 200) {
                return res.json()
            }
        })
    }

    /**
     * Main handler function, returns a promise after determining the nearest cafe and
     * the distance to this cafe
     *
     * @param float     lat     Signed float, the latitude of the desired source position
     * @param float     long    Signed float, the longitude of the desired source position
     *
     * @return promise
    **/
    function process(lat, long, type) {
        return gAPIReq(
            "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
            {
                location: lat + ',' + long,
                // keyword: 'cafe',
                name:  type,
                rankby: 'distance',
                key: env.GOOGLE_NEARBY_KEY // set your env, or replace these
            }
        ).then(closest => {
            if (closest.status !== 'OK') {
                closest.error_message = (closest.status === "ZERO_RESULTS") ? "Try more specific phrase" : closest.error_message
                throw `${closest.status} : ${closest.error_message}`
            }
            closest = closest.results[0]
            return gAPIReq(
                "https://maps.googleapis.com/maps/api/distancematrix/json",
                {
                    units: 'imperial',
                    origins: `${lat},${long}`,
                    mode: 'walking',
                    destinations: [`${closest.geometry.location.lat},${closest.geometry.location.lng}`],
                    key: env.GOOGLE_DISTANCE_MATRIX_KEY
                }
            ).then(res => {
                return {
                    name: closest.name,
                    icon: closest.icon,
                    distance: res.rows[0].elements[0].distance,
                    driving: res.rows[0].elements[0].duration
                }
            })
        })
    }
    return {
        /**
         * get method takes in the lat and longitude and returns a promise that evaluates
         * to the closest cafe
         *
         * @public
         *
         * @param string    url     The url to hit
         * @param object    params  Object represetning the GET query params
         *
         * @return promise
        **/
        get: (lat, long, type) => {
            assert(typeof env.GOOGLE_DISTANCE_MATRIX_KEY === 'string', 'Expecting Google Distance Matrix API key set in env variables')
            assert(typeof env.GOOGLE_NEARBY_KEY === 'string', 'Expecting Google Nearby API key set in env variables')
            return process(lat, long, type)
        }
    }
})(process.env);
