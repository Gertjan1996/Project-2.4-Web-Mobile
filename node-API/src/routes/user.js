import bcrypt from 'bcryptjs'
import { Router } from 'express'
 
const router = Router()
 
router.get('/', async (req, res) => { // curl http://localhost:3000/users
  const users = await req.context.models.User.find()
  return res.send(users)
})
  
router.get('/:userId', async (req, res) => { // curl http://localhost:3000/users/1
  const user = await req.context.models.User.findById(req.params.userId)
  return res.send(user)
})
     
router.post('/register', async (req, res) => { // curl -X POST http://localhost:3000/users/register
  // Controleer of username beschikbaar iu
  if (await req.context.models.User.findOne({ username: req.body.username })) {
    throw 'Gebruikersnaam "' + req.body.username + '" is al in gebruik, kies een andere'
  }
  const user = await req.context.models.User.create({
    username: req.body.username,
    hash: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email
  }).catch((error) => {
    error.statusCode = 400
    next(error)
  })
  return res.send(user)
})
     
router.put('/:userId', (req, res) => { // curl -X PUT http://localhost:3000/users/1
  return res.send(`PUT (Update) HTTP methode ontvangen op user/${req.params.userId} resource`)
})
     
router.delete('/:userId', (req, res) => { // curl -X DELETE http://localhost:3000/users/1
  return res.send(`DELETE (Delete) HTTP methode ontvangen op user/${req.params.userId} resource`)
})
 
export default router