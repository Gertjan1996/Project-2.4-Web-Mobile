// Entry point van de API

require('rootpath')()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const errorHandler = require('_helpers/error-handler')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// API routes
app.use('/users', require('./users/users.controller'))

// Globale error-handler
app.use(errorHandler)

// Start server op port 4000
const port = process.env.NODE_ENV === 'production' ? 80 : 4000
const server = app.listen(port, function () {
    console.log('Server draait op poort ' + port)
})