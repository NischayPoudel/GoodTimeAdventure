import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

async function check() {
  const mongoUrl = process.env.MONGODB_URI
  await mongoose.connect(mongoUrl)
  const db = mongoose.connection.db
  const users = await db.collection('users').find({}).limit(2).toArray()
  console.log('Users in database:')
  users.forEach((u, i) => console.log(`User ${i+1}:`, JSON.stringify(u, null, 2)))
  await mongoose.disconnect()
}

check()
