import { Router } from 'express'
import Post from '../models/post'

const router = Router()

router.get('/', async (req, res) => { // Get all posts from forum - no restriction
  Post.find().then(posts => {
    return res.status(200).json(posts)
  }).catch(error => {
    console.log(error)
    return res.status(500).json({ error: 'Server error, probeer het later nog een keer' }) // Generic error message
  })
})

export default router