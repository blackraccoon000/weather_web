require('dotenv').config()
const env = process.env
const request = require('request')

// ### Access Key Get ###
const WEATHER_ACCESS_KEY = env.WEATHER_ACCESS_KEY
// console.log({WEATHER_ACCESS_KEY})

// ### Weather Search ###
const forecast = (longitude,latitude,callback) => {
  const locate = `${latitude},${longitude}`
  const url = `http://api.weatherstack.com/current?access_key=${WEATHER_ACCESS_KEY}&query=${locate}`
  // console.log(url)

  request({ url, json: true },( error, {body} )=>{
    if(error){
      callback('Unable to connect to weather service!',undefined)
    } else if( body.error ){
      callback('Unable to find location',undefined)
    } else {
      // const data = response.body
      // callback(undefined,data)
      // callback(undefined,`${response.body.location.region} ${response.body.location.name}\n${response.body.location.lon},${response.body.location.lat}\n${response.body.location.localtime}\nIts currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out.\n${response.body.current.weather_descriptions}`)
      // callback(undefined,`${body.location.localtime}\nIts currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.\n${body.current.weather_descriptions}`)
      const forecastArray = {
        body,
        localtime:body.location.localtime,
        temperature:body.current.temperature,
        feelslike:body.current.feelslike,
        descriptions:body.current.weather_descriptions,
        message:`${body.location.localtime}\nIts currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.\n${body.current.weather_descriptions}`
      }
      callback(undefined,forecastArray)
      // callback(undefined,body)
    }
  })
}

module.exports = forecast