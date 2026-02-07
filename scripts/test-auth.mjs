// Test the exact auth flow
import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

// Use exact same User model as app
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tour' }],
  createdAt: { type: Date, default: Date.now },
}, { 
  collection: 'users'
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

async function testAuth() {
  try {
    const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/goodtime-adventure'
    await mongoose.connect(mongoUrl)
    console.log('✅ Connected to MongoDB')

    // Simulate auth attempt
    const credentials = {
      email: 'admin@goodtimeadventure.com',
      password: 'Admin@12345'
    }

    const email = credentials.email.toLowerCase().trim()
    console.log('\n🔍 Looking for email:', email)

    const user = await User.findOne({ email: email })
    console.log('User found:', user ? 'YES ✅' : 'NO ❌')

    if (!user) {
      console.log('\n⚠️ Checking what emails are in database...')
      const allEmails = await User.find({}).select('email').lean()
      console.log('Emails in database:', allEmails.map(u => u.email))
      await mongoose.disconnect()
      return
    }

    console.log('Email in DB:', user.email)
    console.log('Role:', user.role)

    const isValid = await bcryptjs.compare(credentials.password, user.passwordHash)
    console.log('\n🔐 Password check:', isValid ? 'VALID ✅' : 'INVALID ❌')

    if (isValid) {
      console.log('\n✅ AUTH WOULD SUCCEED')
    } else {
      console.log('\n❌ AUTH WOULD FAIL - PASSWORD MISMATCH')
    }

    await mongoose.disconnect()
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

testAuth()
