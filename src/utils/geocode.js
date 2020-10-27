require('dotenv').config()
const env = process.env
const request = require('request')

// ### Access Key Get ###
const MAPBOX_ACCESS_KEY = env.MAPBOX_ACCESS_KEY

// ### Geocode Search ###
const geocode = (address,callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_ACCESS_KEY}`
  request({ url, json: true }, ( error, { body }) => {
    if( error ) {
      callback('Unable to connect to location service!',undefined)
    } else if ( body.features.length === 0 ) {
      callback('Unable to find location. Try another search.',undefined)
    } else {
      // ### Search location More ###
      // body.features.map((place)=>{
      // console.log(`${place.text} : ${place.center} _ex:${place.matching_text}`)
      // })
      
      const data = {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name 
      }
      callback(undefined,data)
    }
  })
}

module.exports = geocode