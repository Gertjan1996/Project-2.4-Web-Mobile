import bcrypt from 'bcryptjs'
import Router from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user'
 
const router = Router()
 
router.get('/', async (req, res) => {
  User.find().then(users => {
    return res.status(200).json(users)
  }).catch(error => {
    console.log(error)
    return res.status(500).json({ error: 'Server error, probeer het later nog een keer' }) // Generic error message
  })
})
  
router.get('/:userId', async (req, res) => { // curl http://localhost:3000/users/1
  User.findById(req.params.userId).then(user => {
    return res.status(200).json(user)
  }).catch(error => {
    console.log(error)
    return res.status(500).json({ error: 'Server error, probeer het later nog een keer' }) // Generic error message
  })
})

router.post('/authenticate', async (req, res) => {
  User.findOne({
    username: req.body.username
  }).then(user => {
    if (bcrypt.compareSync(req.body.password, user.hash)) {
      const token = jwt.sign({ sub: user.id, role: user.role }, process.env.MY_SECRET)
      console.log(token)
      return res.status(200).json({
        ...user.toJSON(),
        token
      })
    } else {
      console.log(user)
      return res.status(400).json({ error: 'Dit wachtwoord is niet correct' })
    }
  }).catch(error => {
    console.log(error)
    return res.status(400).json({ error: 'Deze gebruikersnaam is niet in gebruik' })
  })
})
     
router.post('/register', async (req, res) => {
  User.create({
    username: req.body.username,
    hash: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email
  }).then(() => {
    return res.status(201).json({ message: 'Account aangemaakt' }) // Respond with success message
  }).catch(error => {
    console.log(error)
    if (User.findOne({ username: req.body.username })) { // Check if username is already taken
      return res.status(409).json({ error: 'Gebruikersnaam of email al in gebruik' })
    }
    return res.status(500).json({ error: 'Server error, probeer het later nog een keer' }) // Generic error message
  })
})
     
router.put('/:userId', (req, res) => { // TODO: deze methode goed implementeren
  return res.send(`PUT (Update) HTTP methode ontvangen op user/${req.params.userId} resource`)
})
     
router.delete('/:userId', (req, res) => { // TODO: deze methode goed implementeren
  return res.send(`DELETE (Delete) HTTP methode ontvangen op user/${req.params.userId} resource`)
})
 
export default router