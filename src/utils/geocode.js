const request = require('request')

const geocode = (adress,callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidGFiYWgiLCJhIjoiY2ticmloYzh0MndzdzJ4bDk5Z2Y1eTZvbSJ9.6mHw9SLbnvcNFaHmMRVP7g'
  request({url:url,json:true},(error,response) => {

    if(error){
      callback('Unable to connect to location services',undefined)
    }else if(response.body.features.length===0){
      callback('Unable to find location, try another search',undefined)
    }else{
      callback(undefined,{
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      })
    }
  })

}
module.exports = geocode
