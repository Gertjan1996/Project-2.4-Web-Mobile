// UserModel met beschikbare model voor een user voor CRUD-handelingen op users in MongoDB

const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Schema voor een user in MongoDB
const schema = new Schema({
  username: { type: String, unique: true, required: true },
  hash: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, default: 'Admin'},
  createdDate: { type: Date, default: Date.now }
})

schema.set('toJSON', {
  virtuals: true,  // Virtual ID van MonoDB _id
  versionKey: false,
  // ID en hash niet meenemen in API response
  transform: function (doc, ret) {
    delete ret._id
    delete ret.hash
  }
})

module.exports = mongoose.model('User', schema)