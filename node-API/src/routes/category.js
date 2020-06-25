import Router from 'express'
import authorize from '../helpers/authorize'
import Category from '../models/user'

const router = Router()
 
router.get('/', async (req, res) => { // Get all categories - no restriction
  Category.find().then(categories => {
    return res.status(200).json(categories)
  }).catch(error => {
    console.log(error)
    return res.status(500).json({ error: 'Server error, probeer het later nog een keer' }) // Generic error message
  })
})

router.post('/', authorize('Admin'), async (req, res) => { // Post new category - admin level restriction
  Category.create({
    category: req.body.category,
    imgPath: req.body.imgPath
  }).then(() => {
    return res.status(201).json({ message: 'Post aangemaakt' }) // Respond with success message
  }).catch(error => {
    console.log(error)
    return res.status(500).json({ error: 'Server error, probeer het later nog een keer' }) // Generic error message
  })
})
 
export default router