const express = require('express') // give a single function
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forcast.js')
const app = express() // create an application
// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('views',viewsPath) // to set tell express use this dir for my views.
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
  res.render('index',{
    title:'Weather App',
    name:'Andrew Mead',
    body:'The body of the document'
  })
})
app.get('/about',(req,res) => {
  /*res.send(
    '<h1>Welcome to our page </h1>'
  )// send allow to send something back to the requester
  */
  res.render('about',{
    title:'About us',
    name:'Thierno amadou, CEO',
    body:'student at INSA de Toulouse'
  })
})

app.get('/help',(req,res) => {
  /*
  res.send({
    name:'Amadou',
    age:24
  })
  */
  res.render('help',{
    title: 'Help Page',
    name:'If you need help it is in this page',
    body:'contact me at tabah@etud.insa-Toulouse.fr',
    helpText: 'This is some helpful text.',
  })
})
/*
app.get('/about',(req,res) => {
  const data = [
    {
      name:'Bah',
      age:25
    },{
      name :'Diallo',
      age:30
    }
  ];
  let response = ''
  data.forEach((element) =>response+=`<h1> Name : ${element.name}, Age: ${element.age}</h1>`)
  res.send(response)

})
*/
app.get('/help/*',(req,res) => {
  //res.send('Help article not found')
  res.render('page404',{
    message:'Help article not found'
  })
})
app.get('/weather',(req,res) => {
  if(!req.query.address){
    return res.send({
      error:'Yout must provide a location'
    })
  }
  geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
    if(error){
      return res.send({error})
    }
    forecast(longitude,latitude,(error,forecastData) => {
      if(error){
        return res.send({error})
      }
      res.send({
        forecast:forecastData,
        location,
        address:req.query.address
      })
    })
  })

})
app.get('/products',(req,res) => {
  if(!req.query.search){
    return res.send({
      error:'You must provide a search term'
    })
  }
  console.log(req.query);
  res.send({
    products : []
  })
})
app.get('*',(req,res) => {
  //res.send('My 404 page')
  res.render('page404',{
    message:'Page not found'
  })
})

app.listen(3000,() => {
    console.log('Server is up on port: ',3000);
})
// start up the server
