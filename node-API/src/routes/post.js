import { v4 } from 'uuid'
import { Router } from 'express'
 
const router = Router()
 
router.get('/', (req, res) => { // curl http://localhost:3000/posts
  return res.send(Object.values(req.context.models.posts))
})
     
router.get('/:postId', (req, res) => { // curl http://localhost:3000/posts/1
  return res.send(req.context.models.posts[req.params.postId])
})
  
router.post('/', (req, res) => { // curl -X POST -H "Content-Type:application/json" http://localhost:3000/posts -d "{\"text\":\"Test\"}"
  const id = v4()
  const post = {
    id,
    text: req.body.text,
    userId: req.context.user.id,
    categoryId: req.context.category.id
  }
  req.context.models.posts[id] = post
  return res.send(post)
})
  
router.delete('/:postId', (req, res) => { // curl -X DELETE http://localhost:3000/posts/1
  const {
    [req.params.postId]: post,
    ...otherPosts
  } = req.context.models.posts
  req.context.models.posts = otherPosts
  return res.send(post)
})
 
export default router