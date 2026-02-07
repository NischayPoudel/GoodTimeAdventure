// Diagnostic script to check admin user in database
import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['user', 'admin'] },
  createdAt: { type: Date, default: Date.now },
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

async function diagnose() {
  try {
    const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/goodtime-adventure'
    await mongoose.connect(mongoUrl)
    console.log('✅ Connected to MongoDB')

    // Find admin user
    const admin = await User.findOne({ email: 'admin@goodtimeadventure.com' })
    
    if (!admin) {
      console.log('❌ Admin user NOT found in database')
      console.log('Check if database has any users...')
      const allUsers = await User.find({})
      console.log('All users:', allUsers.map(u => ({ email: u.email, role: u.role })))
      process.exit(1)
    }

    console.log('✅ Admin user found!')
    console.log('Email:', admin.email)
    console.log('Name:', admin.name)
    console.log('Role:', admin.role)
    console.log('Password Hash:', admin.passwordHash.substring(0, 20) + '...')

    // Test password comparison
    const testPassword = 'Admin@12345'
    console.log('\n🧪 Testing password comparison...')
    console.log('Testing password:', testPassword)

    const isValid = await bcryptjs.compare(testPassword, admin.passwordHash)
    console.log('Password matches:', isValid ? '✅ YES' : '❌ NO')

    if (!isValid) {
      console.log('\n⚠️  Password does not match!')
      console.log('This means the hashing in the database is different from what the auth is comparing against.')
      
      // Try hashing the password again to see the format
      const newHash = await bcryptjs.hash(testPassword, 12)
      console.log('New hash would be:', newHash.substring(0, 20) + '...')
    }

    await mongoose.disconnect()
    console.log('\n✅ Diagnosis complete')
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

diagnose()
