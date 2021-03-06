const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// console.log(path.join(__dirname,'./utils/'))

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
  res.render('index', {
    title: 'Weather App',
    name: 'Yutaka Fujii'
  })
})

app.get('/about',(req,res)=>{
  res.render('about', {
    title: 'About Me',
    name: 'Yutaka Fujii'
  })
})

app.get('/help',(req,res)=>{
  res.render('help', {
    title: 'Help Page',
    message: 'This is some helpful text.',
    name: 'Yutaka Fujii'
  })
})


app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({
      error: 'サーチボックスに入力してください。',
      name: 'Yutaka Fujii'
    })
  }
  geocode(req.query.address,(error, {longitude,latitude,location}={})=>{
    if(error){
      return res.send({ error })
    }

    forecast(longitude, latitude, (error, forecastData) => {
      if(error){
        return res.send({ error })
      }
      return res.send({
        body:forecastData.body,
        localtime:forecastData.localtime,
        temperature:forecastData.temperature,
        feelslike:forecastData.feelslike,
        descriptions:forecastData.descriptions,
        message:forecastData.message,
        location,
        address: req.query.address
      })     
    })
  })
  }
)


app.get('/help/*',(req,res)=>{
  res.render('error', {
    title: 'error pages',
    name: 'Yutaka Fujii',
    errorMessage: 'Help article not found'
  })
})

app.get('/products',(req,res)=>{
  if(!req.query.search){
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products:[]
  })
})

app.get('*',(req,res)=>{
  res.render('404', {
    title: '404 pages',
    name: 'Yutaka Fujii',
    errorMessage: 'Page not found'
  })
})

app.listen(port,()=>{
  console.log(`Server is up on port ${port}.`)
})