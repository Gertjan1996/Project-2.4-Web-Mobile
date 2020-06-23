import mongoose from 'mongoose'
 
const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      unique: true,
      required: true
    },
    imgPath: {
      type: String
    }
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
)

categorySchema.pre('remove', function(next) { // Pre hook to delete messages in category when category is deleted
  this.model('Post').deleteMany({ category: this._id }, next)
})

const Category = mongoose.model('Category', categorySchema)
 
export default Category