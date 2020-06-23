import { Router } from 'express'
 
const router = Router()
 
router.get('/', async (req, res) => { // curl http://localhost:3000/categories
  const categories = await req.context.models.Category.find()
  return res.send(categories)
})
       
router.get('/:categoryId', async (req, res) => { // curl http://localhost:3000/categories/1
  const category = await req.context.models.Category.findById(req.params.categoryId)
  return res.send(category)
})
  
router.post('/', async (req, res) => { // curl -X POST -H "Content-Type:application/json" http://localhost:3000/categories -d "{\"category\":\"Testcat\",\"imgPath\":\"Testpat\"}"
  const category = await req.context.models.Category.create({
    category: req.body.category,
    imgPath: req.body.imgPath
  })
  return res.send(category)
})
  
router.delete('/:categoryId', async (req, res) => { // curl -X DELETE http://localhost:3000/categories/1
  const category = await req.context.Category.findById(req.params.categoryId)
  if (category) { await category.remove() }
  return res.send(category)
})
 
export default router