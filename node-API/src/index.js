import 'dotenv/config' // Environment variables (should come before other local imports)
import cors from 'cors'
import express from 'express'
import { v4 } from 'uuid'

console.log('Hello Node.js Project')
console.log('SECRET: ' + process.env.MY_SECRET)

const app = express() // Express application instance

app.use(express.json()) // Middleware to transform json body type from request object
app.use(express.urlencoded({ extended: true })) // Middleware to access payload of an HTTP POST request
app.use(cors()) // Middleware to allow Cross-origin resource sharing
app.use((req, res, next) => { // Middleware to add users[1] as sender and categories[1] as category - only for test purposes
  req.user = users[1]
  req.category = categories[1]
  next()
})

let users = { // Hardcoded - MongoDB connection in the future
  1: {
    id: '1',
    username: 'Gertjan_Haan',
    email: 'gertjanhaan@live.nl',
    password: 'adminadmin',
    role: 'Admin'
  },
  2: {
    id: '2',
    username: 'Jun_Lin',
    email: 'junlin@live.nl',
    password: 'adminadmin',
    role: 'Admin'
  }
}

let categories = { // Hardcoded - MongoDB connection in the future
  1: {
    id: '1',
    category: 'Voetbal',
    imgPath: 'path_to_img_resource'
  },
  2: {
    id: '2',
    category: 'Hockey',
    imgPath: 'path_to_img_resource'
  }
}

let posts = { // Hardcoded - MongoDB connection in the future
  1: {
    id: '1',
    text: 'Test Post nr. 1 van user met userId 1 in categorie met categoryId 1',
    userId: '1',
    categoryId: '1'
  },
  2: {
    id: '2',
    text: 'Test Post nr. 2 van user met userId 2 in categorie met categoryId 2',
    userId: '2',
    categoryId: '2'
  }
}

app.get('/users', (req, res) => { // curl http://localhost:3000/users
  return res.send(Object.values(users))
})

app.get('/users/:userId', (req, res) => { // curl http://localhost:3000/users/1
  return res.send(users[req.params.userId])
})
   
app.post('/users', (req, res) => { // curl -X POST http://localhost:3000/users
  return res.send('POST (Create) HTTP methode ontvangen op user resource')
})
   
app.put('/users/:userId', (req, res) => { // curl -X PUT http://localhost:3000/users/1
  return res.send(`PUT (Update) HTTP methode ontvangen op user/${req.params.userId} resource`)
})
   
app.delete('/users/:userId', (req, res) => { // curl -X DELETE http://localhost:3000/users/1
  return res.send(`DELETE (Delete) HTTP methode ontvangen op user/${req.params.userId} resource`)
})

app.get('/posts', (req, res) => { // curl http://localhost:3000/posts
  return res.send(Object.values(posts))
})
   
app.get('/posts/:postId', (req, res) => { // curl http://localhost:3000/posts/1
  return res.send(posts[req.params.postId])
})

app.post('/posts', (req, res) => { // curl -X POST -H "Content-Type:application/json" http://localhost:3000/posts -d "{\"text\":\"Test\"}"
  const id = v4()
  const post = {
    id,
    text: req.body.text,
    userId: req.user.id,
    categoryId: req.category.id
  }
  posts[id] = post
  return res.send(post)
})

app.delete('/posts/:postId', (req, res) => { // curl -X DELETE http://localhost:3000/posts/1
  const {
    [req.params.postId]: post,
    ...otherPosts
  } = posts
  posts = otherPosts
  return res.send(post)
})

app.get('/categories', (req, res) => { // curl http://localhost:3000/categories
  return res.send(Object.values(categories))
})
     
app.get('/categories/:categoryId', (req, res) => { // curl http://localhost:3000/categories/1
  return res.send(categories[req.params.categoryId])
})

app.post('/categories', (req, res) => { // curl -X POST -H "Content-Type:application/json" http://localhost:3000/categories -d "{\"category\":\"Testcat\",\"imgPath\":\"Testpat\"}"
  const id = v4()
  const category = {
    id,
    category: req.body.category,
    imgPath: req.body.imgPath
  }
  categories[id] = category
  return res.send(category)
})

app.delete('/categories/:categoryId', (req, res) => { // curl -X DELETE http://localhost:3000/categories/1
  const {
    [req.params.categoryId]: category,
    ...otherCategories
  } = categories
  categories = otherCategories
  return res.send(category)
})

app.listen(process.env.PORT, () =>
  console.log(`API draait op poort ${process.env.PORT}!`) // App listens on port set in .env
)