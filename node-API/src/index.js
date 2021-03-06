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
app.use('/users', routes.user)
app.use('/categories', routes.category)
app.use('/posts', routes.post_all)
app.get('*', function (req, res, next) { // Error for non-existing routes
  const error = new Error(`${req.ip} probeerde de volgende URL te bereiken: ${req.originalUrl}`)
  error.statusCode = 301
  next(error)
})