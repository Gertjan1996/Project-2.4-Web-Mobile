import mongoose from 'mongoose'
 
const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    category: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Category'
    }
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
)

const Post = mongoose.model('Post', postSchema)
 
export default Post