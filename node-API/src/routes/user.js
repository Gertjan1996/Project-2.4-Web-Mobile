import { Router } from 'express'
 
const router = Router()
 
router.get('/', (req, res) => { // curl http://localhost:3000/users
  return res.send(Object.values(req.context.models.users))
})
  
router.get('/:userId', (req, res) => { // curl http://localhost:3000/users/1
  return res.send(req.context.models.users[req.params.userId])
})
     
router.post('/', (req, res) => { // curl -X POST http://localhost:3000/users
  return res.send('POST (Create) HTTP methode ontvangen op user resource')
})
     
router.put('/:userId', (req, res) => { // curl -X PUT http://localhost:3000/users/1
  return res.send(`PUT (Update) HTTP methode ontvangen op user/${req.params.userId} resource`)
})
     
router.delete('/:userId', (req, res) => { // curl -X DELETE http://localhost:3000/users/1
  return res.send(`DELETE (Delete) HTTP methode ontvangen op user/${req.params.userId} resource`)
})
 
export default router