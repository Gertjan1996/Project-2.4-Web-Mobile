import bcrypt from 'bcryptjs'
import Router from 'express'
import jwt from 'jsonwebtoken'
import authorize from '../helpers/authorize'
import User from '../models/user'
 
const router = Router()
 
router.get('/', authorize('Admin'), async (req, res) => { // Get all users - admin level restriction
  User.find().then(users => {
    return res.status(200).json(users)
  }).catch(error => {
    console.log(error)
    return res.status(500).json({ error: 'Server error, probeer het later nog een keer' }) // Generic error message
  })
})
  
router.get('/:userId', authorize(), async (req, res) => { // Get single user - user level restriction for own ID, overall admin level restriction
  if(req.user.sub !== req.params.userId && req.user.role !== 'Admin') {
    return res.status(401).json({ message: 'Niet geauthoriseerd' }) // Not admin and not own id -> not authorised
  } else {
    User.findById(req.params.userId).then(user => { // TODO: Add restriction for normal user at only own ID
      return res.status(200).json(user)
    }).catch(error => {
      console.log(error)
      return res.status(500).json({ error: 'Server error, probeer het later nog een keer' }) // Generic error message
    })
  }
})

router.post('/authenticate', async (req, res) => { // Authenticate user - no restriction
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
     
router.post('/register', async (req, res) => { // Register new user - no restriction
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
 
export default router