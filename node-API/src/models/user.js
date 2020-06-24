import mongoose from 'mongoose'
 
const userSchema = new mongoose.Schema( // TODO: Add roles with default set as user
  {
    username: {
      type: String,
      unique: true,
      required: true,
      minLength: 5,
      maxLength: 30
    },
    hash: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      minLength: 5,
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

userSchema.set('toJSON', {
  virtuals: true,  // Virtual ID van MongoDB _id
  versionKey: false, // Exclude the MongoDB version key
  // ID en hash niet meenemen in API response
  transform: function (doc, ret) {
    delete ret._id
    delete ret.hash
    delete ret.createdAt
    delete ret.updatedAt
  }
})

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