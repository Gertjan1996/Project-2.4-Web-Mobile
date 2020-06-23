import { v4 } from 'uuid'
import { Router } from 'express'
 
const router = Router()
 
router.get('/', (req, res) => { // curl http://localhost:3000/categories
  return res.send(Object.values(req.context.models.categories))
})
       
router.get('/:categoryId', (req, res) => { // curl http://localhost:3000/categories/1
  return res.send(req.context.models.categories[req.params.categoryId])
})
  
router.post('/', (req, res) => { // curl -X POST -H "Content-Type:application/json" http://localhost:3000/categories -d "{\"category\":\"Testcat\",\"imgPath\":\"Testpat\"}"
  const id = v4()
  const category = {
    id,
    category: req.body.category,
    imgPath: req.body.imgPath
  }
  req.context.models.categories[id] = category
  return res.send(category)
})
  
router.delete('/:categoryId', (req, res) => { // curl -X DELETE http://localhost:3000/categories/1
  const {
    [req.params.categoryId]: category,
    ...otherCategories
  } = req.context.models.categories
  req.context.models.categories = otherCategories
  return res.send(category)
})
 
export default router