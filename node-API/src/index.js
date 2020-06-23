import 'dotenv/config' // Environment variables (should come before other local imports)
import cors from 'cors'
import express from 'express'

console.log('Hello Node.js Project')
console.log('SECRET: ' + process.env.MY_SECRET)

const app = express() // Express application instance

app.use(cors()) // Allow Cross-origin resource sharing

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT, () =>
  console.log(`API draait op poort ${process.env.PORT}!`) // App listens on port set in .env
)