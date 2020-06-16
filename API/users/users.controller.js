// Controller met routes voor de API

const express = require('express')
const router = express.Router()
const userService = require('./user.service')
const authorize = require('_helpers/authorize')

// Beschikbare API-routes (prefix /users)
router.post('/authenticate', authenticate)   // Public route
router.get('/', authorize('Admin'), getAll)  // Admin route
router.get('/:id', authorize(), getById)     // Route voor alle gebruikers

module.exports = router

// Route voor authenticatie van inloggegevens en teruggeven van een JWT token
function authenticate(req, res, next) {
  userService.authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Gebruikersnaam of wachtwoord is incorrect' }))
    .catch(error => next(error))
}

// Route voor teruggeven van alle gebruikers
function getAll(req, res, next) {
  userService.getAll()
    .then(users => res.json(users))
    .catch(error => next(error))
}

// Route voor teruggeven van een gebruiker middels zijn/ haar ID
function getById(req, res, next) {
  const currentUser = req.user
  const id = parseInt(req.params.id)

  // Alleen admins toestaan records van andere gebruikers op te vragen
  if (id !== currentUser.sub && currentUser.role !== 'Admin') {
    return res.status(401).json({ message: 'Niet geauthoriseerd' })
  }

  userService.getById(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(error => next(error))
}