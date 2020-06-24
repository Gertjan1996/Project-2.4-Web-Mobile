import 'dotenv/config' // Environment variables (should come before other local imports)
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose' 
import models, { connectDb } from './models'
import routes from './routes'

console.log('Hello Node.js Project')
console.log('SECRET: ' + process.env.MY_SECRET)

const app = express() // Express application instance
const eraseDatabaseOnSync = false
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(async () => { // Connect to MongoDb database
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Category.deleteMany({}),
      models.Post.deleteMany({})
    ])
    createInitialData()
  }
  app.listen(process.env.PORT, () =>
    console.log(`API draait op poort ${process.env.PORT}!`) // App listens on port set in .env
  )
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

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

const createInitialData = async () => { // Database seeding
  const user1 = new models.User({
    username: 'Gertjan',
    email: 'gertjan@live.nl',
    role: 'Admin'
  })
  const user2 = new models.User({
    username: 'Jun',
    email: 'jun@live.nl',
    role: 'Admin'
  })
  const user3 = new models.User({
    username: 'NormalUser',
    email: 'user@live.nl'
  })
  const category1 = new models.Category({
    category: 'Voetbal',
    imgPath: 'path_to_img'
  })
  const post1 = new models.Post({
    text: 'Ik ben forumpost 1',
    user: user1.id,
    category: category1.id
  })
  const post2 = new models.Post({
    text: 'Ik ben forumpost 2',
    user: user2.id,
    category: category1.id
  })
  const post3 = new models.Post({
    text: 'Ik ben forumpost 3',
    user: user2.id,
    category: category1.id
  })
  await user1.save()
  await user2.save()
  await user3.save()
  await category1.save()
  await post1.save()
  await post2.save()
  await post3.save()
}