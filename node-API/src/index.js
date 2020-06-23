import 'dotenv/config' // Environment variables (should come before other local imports)
import cors from 'cors'
import express from 'express'

console.log('Hello Node.js Project')
console.log('SECRET: ' + process.env.MY_SECRET)

const app = express() // Express application instance

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
  },
}

app.use(cors()) // Allow Cross-origin resource sharing

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

app.get('/categories', (req, res) => { // curl http://localhost:3000/categories
  return res.send(Object.values(categories))
})
     
app.get('/categories/:categoryId', (req, res) => { // curl http://localhost:3000/categories/1
  return res.send(categories[req.params.categoryId])
})

app.listen(process.env.PORT, () =>
  console.log(`API draait op poort ${process.env.PORT}!`) // App listens on port set in .env
)