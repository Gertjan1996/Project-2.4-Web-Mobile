import mongoose from 'mongoose' 
import User from './user'
import Category from './category'
import Post from './post'

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
}
 
const models = { User, Category, Post }
 
export { connectDb }
 
export default models