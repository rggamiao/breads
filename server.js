// Dependencies
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

// Config
require('dotenv').config()
const PORT = process.env.PORT
const app = express()

// Middleware
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

// Connection to Mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('connected to mongo:', process.env.MONGO_URI))
  .catch(err => console.error('connection error:', err));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Breads')
  })

// Breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// Bakers 
const bakersController = require('./controllers/bakers_controller.js')
app.use('/bakers', bakersController)

// 404 Page
app.get('*', (req, res) => {
  res.send('404')
})

// Listener
app.listen(PORT, () => {
  console.log('listening on port', PORT);
})

module.exports = app;
