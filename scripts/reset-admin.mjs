// Script to reset admin user
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

async function resetAdmin() {
  try {
    // Connect to MongoDB
    const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/goodtime-adventure'
    await mongoose.connect(mongoUrl)
    console.log('✅ Connected to MongoDB')

    // Admin credentials
    const adminEmail = 'admin@goodtimeadventure.com'
    const adminPassword = 'Admin@12345'
    const adminName = 'Administrator'

    // Delete ALL users (to clean up stale data)
    const deleteResult = await User.deleteMany({})
    console.log('✅ Deleted', deleteResult.deletedCount, 'old users')

    // Hash password with 12 rounds
    const passwordHash = await bcryptjs.hash(adminPassword, 12)

    // Create new admin user
    const admin = new User({
      name: adminName,
      email: adminEmail.toLowerCase(),
      passwordHash: passwordHash,
      role: 'admin',
    })

    await admin.save()

    console.log('✅ New admin user created successfully!')
    console.log('📧 Email:', adminEmail)
    console.log('🔑 Password:', adminPassword)
    console.log('\n🚀 You can now login at: http://localhost:3000/admin-login')

    // Disconnect
    await mongoose.disconnect()
    console.log('✅ Database disconnected')
  } catch (error) {
    console.error('❌ Error resetting admin user:', error.message)
    process.exit(1)
  }
}

resetAdmin()
