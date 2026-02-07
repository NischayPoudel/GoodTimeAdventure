// Check what's actually in the database
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

async function checkDB() {
  try {
    const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/goodtime-adventure'
    await mongoose.connect(mongoUrl)
    console.log('✅ Connected to MongoDB')

    const db = mongoose.connection.db
    const collections = await db.listCollections().toArray()
    console.log('\n📚 Collections in database:')
    collections.forEach(c => console.log('  -', c.name))

    // Check what's in User collection
    if (collections.find(c => c.name === 'User')) {
      const User = mongoose.model('User', new mongoose.Schema({}, { collection: 'User' }))
      const count = await User.countDocuments()
      console.log('\n📊 User collection has', count, 'documents')
      const users = await User.find().select('email')
      console.log('Emails:', users.map(u => u.email))
    }

    // Check what's in users collection
    if (collections.find(c => c.name === 'users')) {
      const Users = mongoose.model('Users', new mongoose.Schema({}, { collection: 'users' }))
      const count = await Users.countDocuments()
      console.log('\n📊 users collection has', count, 'documents')
      const users = await Users.find().select('email')
      console.log('Emails:', users.map(u => u.email))
    }

    await mongoose.disconnect()
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

checkDB()
