// UserService met beschikbare methodes 

const config = require('config.json')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const mongodb = require('_helpers/mongodb')
const User = mongodb.User

// Gebruikers hardcoded. Moet bijvoorbeeld in MongoDB worden opgeslagen met gehaste wachtwoorden
const users = [
  { id: 1, username: 'admin', password: 'adminadmin', email: 'admin@admin.nl', role: 'Admin' },
  { id: 2, username: 'user', password: 'useruser', email: 'user@user.nl', role: 'User' }
]

// Beschikbare methodes
module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  delete: _delete
}

// Methode voor authenticatie van inloggegevens en teruggeven van een JWT token
async function authenticate({ username, password }) {
  const user = await User.findOne({ username })
  if (user && bcrypt.compareSync(password, user.hash)) {
    // Username password combinatie correct, sign token
    const token = jwt.sign({ sub: user.id, role: user.role }, config.secret)
    return {
      ...user.toJSON(),
      token
    }
  }
}

// Methode voor teruggeven van alle gebruikers
async function getAll() {
  // Return alle gebruikers (zonder wachtwoord)
  return await User.find()
}

// Methode voor teruggeven van een gebruiker middels zijn/ haar ID
async function getById(id) {
  return await User.findById(id)
}

// Methode voor registreren van nieuwe gebruikers
async function create(userParam) {
  // Controleer of username beschikbaar iu
  if (await User.findOne({ username: userParam.username })) {
    throw 'Gebruikersnaam "' + userParam.username + '" is al in gebruik, kies een andere'
  }
  const user = new User(userParam);
  // Hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10)
  }
  // Sla nieuwe user op
  await user.save()
}

// Methode voor verwijderen van een gebruiker
async function _delete(id) {
  await User.findByIdAndRemove(id)
}