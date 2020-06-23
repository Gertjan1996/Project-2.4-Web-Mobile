import 'dotenv/config' // Environment variables (should come before other local imports)
import cors from 'cors'
import express from 'express'
import models from './models'
import routes from './routes'

console.log('Hello Node.js Project')
console.log('SECRET: ' + process.env.MY_SECRET)

const app = express() // Express application instance

app.use(express.json()) // Middleware to transform json body type from request object
app.use(express.urlencoded({ extended: true })) // Middleware to access payload of an HTTP POST request
app.use(cors()) // Middleware to allow Cross-origin resource sharing
app.use((req, res, next) => { // Middleware to add users[1] as sender and categories[1] as category - only for test purposes
  req.context = {
    models, // Middleware to pass the models to all routes
    user: models.users[1], // Middleware to add users[1] as sender - only for test purposes
    category: models.categories[1] // Middleware to add categories[1] as category - only for test purposes
  }
  next()
})
app.use('/users', routes.user)
app.use('/categories', routes.category)
app.use('/posts', routes.post)

app.listen(process.env.PORT, () =>
  console.log(`API draait op poort ${process.env.PORT}!`) // App listens on port set in .env
)