// Service met methodes voor gebruikers

const config = require('config.json')
const jwt = require('jsonwebtoken')

// Gebruikers hardcoded. Moet bijvoorbeeld in MongoDB worden opgeslagen met gehaste wachtwoorden
const users = [
  { id: 1, username: 'admin', password: 'adminadmin', email: 'admin@admin.nl', role: 'Admin' },
  { id: 2, username: 'user', password: 'useruser', email: 'user@user.nl', role: 'User' }
]

// Beschikbare methodes
module.exports = {
  authenticate,
  getAll,
  getById
}

// Methode voor authenticatie van inloggegevens en teruggeven van een JWT token
async function authenticate({ username, password }) {
  const user = users.find(u => u.username === username && u.password === password)
  if (user) {
    // Username password combinatie correct, sign token
    const token = jwt.sign({ sub: user.id, role: user.role }, config.secret)
    const { password, ...userWithoutPassword } = user
    return {
      // Return user zonder wachtwoord, maar met token
      ...userWithoutPassword,
      token
    }
  }
}

// Methode voor teruggeven van alle gebruikers
async function getAll() {
  // Return alle gebruikers (zonder wachtwoord)
  return users.map(user => {
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  })
}

// Methode voor teruggeven van een gebruiker middels zijn/ haar ID
async function getById(id) {
  const user = users.find(user => user.id === parseInt(id))
  if (!user) return
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}