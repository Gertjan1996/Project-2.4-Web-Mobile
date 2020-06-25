import mongoose from 'mongoose'
 
const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User',
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Category',
      required: true
    }
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
)

postSchema.set('toJSON', {
  virtuals: true,  // Virtual ID van MongoDB _id
  versionKey: false, // Exclude the MongoDB version key
  // ID en hash niet meenemen in API response
  transform: function (doc, ret) {
    delete ret._id
  }
})

const Post = mongoose.model('Post', postSchema)
 
export default Post