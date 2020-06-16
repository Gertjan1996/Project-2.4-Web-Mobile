// UserController met beschikbare routes voor de API

const express = require('express')
const router = express.Router()
const userService = require('./user.service')
const authorize = require('_helpers/authorize')

// Beschikbare API-routes (prefix /users)
router.post('/authenticate', authenticate)         // Public route
router.post('/register', register)                 // Public route
router.get('/', authorize('Admin'), getAll)        // Admin route
router.get('/current', authorize(), getCurrent)    // Route voor alle gebruikers
router.get('/:id', authorize('Admin'), getById)    // Route voor alle gebruikers
router.delete('/:id', authorize('Admin'), _delete) // Admin route  

module.exports = router

// Route voor authenticatie van inloggegevens en teruggeven van een JWT token
function authenticate(req, res, next) {
  userService.authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Gebruikersnaam of wachtwoord is incorrect' }))
    .catch(error => next(error))
}

// Route voor registreren van nieuwe gebruikers
function register(req, res, next) {
  userService.create(req.body)
    .then(() => res.json({}))
    .catch(error => next(error))
}

// Route voor teruggeven van alle gebruikers
function getAll(req, res, next) {
  userService.getAll()
    .then(users => res.json(users))
    .catch(error => next(error))
}

// Route voor teruggeven van huidige gebruiker
function getCurrent(req, res, next) {
  userService.getById(req.user.sub)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(error => next(error))
}

// Route voor teruggeven van een gebruiker middels zijn/ haar ID
function getById(req, res, next) {
  userService.getById(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(error => next(error))
}

// Route voor verwijderen van een gebruiker
function _delete(req, res, next) {
  userService.delete(req.params.id)
    .then(() => res.json({}))
    .catch(error => next(error))
}