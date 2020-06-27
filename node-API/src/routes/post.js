import { Router } from 'express'
import authorize from '../helpers/authorize'
import Post from '../models/post'

const router = Router()

router.get('/', async (req, res) => { // Get all posts of a category - no restriction
  Post.find({ category: req.categoryId }).then(posts => { // categoryId is set in routes/category.js
    return res.status(200).json(posts)
  }).catch(error => {
    console.log(error)
    return res.status(500).json({ error: 'Server error, probeer het later nog een keer' }) // Generic error message
  })
})
  
router.post('/', authorize(), async (req, res) => { // Post a new post - user level restriction
  Post.create({
    text: req.body.text,
    user: req.user.sub, // userId is set in helpers/authorize.js
    category: req.categoryId // categoryId is set in routes/category.js
  }).then(() => {
    return res.status(201).json({ message: 'Forumpost aangemaakt' })
  }).catch(error => {
    console.log(error)
    return res.status(500).json({ error: 'Server error, probeer het later nog een keer' })
  })
})

export default router