// fecth doesn't work in node, work only on the web browser.
/*
const url = 'http://api.weatherstack.com/current?access_key=6c00be694ae11909473d8b027562e27b&query=37.88267,-122.4233'
//const gecode = require('../../../weather-app/utils/gecode.js')
fetch(url)
.then((response) => {
  response.json()
  .then((data) => {
    if(data.error){
      console.log(data.error);
    }else {
      console.log(data.location.name);
    }
  })
})
*/
const weatherForm = document.querySelector('form')
const searchData = document.querySelector('input')
const firstMessage = document.getElementById('firstMessage')
const secondMessage = document.getElementById('secondMessage')
weatherForm.addEventListener('submit',(e) => {
  e.preventDefault()
  const location =searchData.value
  //console.log(location);
  const url = `http://localhost:3000/weather?address=${location}`
  fetch(url)
  .then((response) => {
    response.json()
    .then((data) => {
      if(data.error){
        firstMessage.textContent = data.error
        secondMessage.textContent=''
      }else{
        firstMessage.textContent = data.location
        secondMessage.textContent=data.forecast.current
      }
    })
  })
  .catch((error) => {
    log(error)
  })
})
