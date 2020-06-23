const request = require('request')


const forecast = (longitude,latitude,callback) => {
  const url = `http://api.weatherstack.com/current?access_key=6c00be694ae11909473d8b027562e27b&query=${longitude},${latitude}`

  request({url:url,json:true},(error,{body}) => {
    if(error){
      callback('Unable to connect to location services',undefined)
    }else if(body.error){
      callback('Unable to fin loaction,try another search',undefined)
    }else{
      callback(undefined,{
        current: `It is currently ${body.current.temperature} degres out. The Humidity is ${body.current.humidity}`
      })
    }
  })


}

module.exports = forecast
