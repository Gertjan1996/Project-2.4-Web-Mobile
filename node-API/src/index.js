import 'dotenv/config' // Environment variables (should come before other local imports)
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose' 
import seedDb from './helpers/seedDb'
import models from './models'
import routes from './routes'

console.log('Hello Node.js Project')
console.log('SECRET: ' + process.env.MY_SECRET)
console.log('Secret string not showing? .env environment variables staan niet op GitHub! ;)')

const app = express() // Express application instance
const eraseDatabaseOnSync = false // Set to true to delete all data in MongoDB database
try {
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(async () => { // Connect to MongoDb database
    if (eraseDatabaseOnSync) {
      await Promise.all([
        models.User.deleteMany({}),
        models.Category.deleteMany({}),
        models.Post.deleteMany({})
      ])
      seedDb() // Fill MongoDB database with some initial data
    }
    app.listen(process.env.PORT, () =>
      console.log(`API draait op poort ${process.env.PORT}!`) // App listens on port set in .env
    )
  })
} catch (error) {
  console.log('Database of server error. Error: ' + error)
}
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Middleware section
app.use(express.json()) // Middleware to transform json body type from request object
app.use(express.urlencoded({ extended: true })) // Middleware to access payload of an HTTP POST request
app.use(cors()) // Middleware to allow Cross-origin resource sharing
app.use(async (req, res, next) => { // Middleware to add users[1] as sender and categories[1] as category - only for test purposes
  req.context = {
    models, // Middleware to pass the models to all routes
    user: await models.User.findByLogin('Gertjan'), // Middleware to add user with username 'Gertjan' as sender - only for test purposes
    category: await models.Category.findOne({ 'text:': 'Ik ben een forumpost 1' }) // Middleware to add categories[1] as category - only for test purposes
  }
  next()
})
app.use('/users', routes.user)
app.use('/categories', routes.category)
app.use('/posts', routes.post)
app.get('*', function (req, res, next) { // Error for non-existing routes
  const error = new Error(`${req.ip} probeerde de volgende URL te bereiken: ${req.originalUrl}`)
  error.statusCode = 301
  next(error)
})
app.use((error, req, res, next) => { // Middleware for errors
  if (!error.statusCode) { error.statusCode = 500 }
  if (error.statusCode === 301 ) { return res.status(301).redirect('/not-found') }
  return res.status(error.statusCode).json({ error: error.toString() })
})