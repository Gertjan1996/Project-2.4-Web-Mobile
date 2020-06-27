// Authorisatie middleware om routes te beperken voor bepaalde rollen
import 'dotenv/config' // Environment variables (should come before other local imports)
import expressJwt from 'express-jwt'

function authorize(roles = []) {
  // Roles param kan een enkele rol zijn (b.v. 'User') 
  // Of een array met meerdere rollen (['Admin', 'User'])
  if (typeof roles === 'string') {
    roles = [roles]
  }

  return [
    // Valideer JWT token en voeg user.sub (userID) + user.role toe aan het request object (req.user)
    expressJwt({ secret: process.env.MY_SECRET }),

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

export default authorize