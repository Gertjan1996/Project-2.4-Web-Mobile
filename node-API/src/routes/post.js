import { Router } from 'express'
import authorize from '../helpers/authorize'
import Post from '../models/post'

const router = Router()

router.get('/', async (req, res) => { // Get all posts of a category - no restriction
  Post.find({ category: req.categoryId }).then(posts => {
    return res.status(200).json(posts)
  }).catch(error => {
    console.log(error)
    return res.status(500).json({ error: 'Server error, probeer het later nog een keer' }) // Generic error message
  })
})
     
router.get('/:postId', async (req, res) => { // curl http://localhost:3000/posts/1
  const post = await req.context.models.Post.findById(req.params.postId)
  return res.send(post)
})
  
router.post('/', async (req, res) => { // curl -X POST -H "Content-Type:application/json" http://localhost:3000/posts -d "{\"text\":\"Test\"}"
  const post = await req.context.models.Post.create({
    text: req.body.text,
    user: req.context.user.id,
    category: req.context.category.id
  }).catch((error) => {
    error.statusCode = 400
    next(error)
  })
  return res.send(post)
})
  
router.delete('/:postId', async (req, res) => { // curl -X DELETE http://localhost:3000/posts/1
  const post = await req.context.models.Post.findById(req.params.postId)
  if (post) { await post.remove() }
  return res.send(post)
})
 
export default router