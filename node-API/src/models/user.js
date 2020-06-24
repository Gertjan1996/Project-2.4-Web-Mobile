import mongoose from 'mongoose'
 
const userSchema = new mongoose.Schema( // TODO: Add roles with default set as user
  {
    username: {
      type: String,
      unique: true,
      required: true,
      maxLength: 30
    },
    email: {
      type: String,
      unique: true,
      required: true,
      maxLength: 100
    },
    role: {
      type: String,
      required: true,
      enum: ['Admin', 'User'], default: 'User'
    }
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
)

userSchema.statics.findByLogin = async function (login) { // Extra method to login with username OR email
  let user = await this.findOne({ username: login })
  if (!user) { 
    user = await this.findOne({ email: login })
  }
  return user
}

userSchema.pre('remove', function(next) { // Pre hook to delete messages of user when user is deleted
  this.model('Post').deleteMany({ user: this._id }, next)
})
 
const User = mongoose.model('User', userSchema)
 
export default User