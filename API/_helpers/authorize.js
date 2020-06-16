// Authorisatie middleware om routes te beperken voor bepaalde rollen

const expressJwt = require('express-jwt')
const { secret } = require('config.json')

module.exports = authorize

function authorize(roles = []) {
  // Roles param kan een enkele rol zijn (b.v. 'User') 
  // Of een array met meerdere rollen (b.v. ['Admin', 'User'])
  if (typeof roles === 'string') {
    roles = [roles]
  }

  return [
    // Valideer JWT token en voeg user.sub (userID) + user.role toe aan het request object (req.user)
    expressJwt({ secret }),

    // Authoriceer gebasseerd op user.role
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role)) {
        // Gebruiker is niet geauthoriseerd
        return res.status(401).json({ message: 'Niet geauthoriseerd' })
      }

      // Validatie en authorisatie succesvol
      next()
    }
  ]
}