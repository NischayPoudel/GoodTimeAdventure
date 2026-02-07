// Script to create an admin user
// Run: node scripts/create-admin.mjs

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

async function createAdminUser() {
  try {
    // Connect to MongoDB
    const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/goodtime-adventure'
    await mongoose.connect(mongoUrl)
    console.log('✅ Connected to MongoDB')

    // Admin credentials
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@goodtimeadventure.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@12345'
    const adminName = process.env.ADMIN_NAME || 'Administrator'

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail })
    if (existingAdmin) {
      console.log(`⚠️  Admin user already exists with email: ${adminEmail}`)
      process.exit(0)
    }

    // Hash password
    const passwordHash = await bcryptjs.hash(adminPassword, 12)

    // Create admin user
    const admin = new User({
      name: adminName,
      email: adminEmail,
      passwordHash: passwordHash,
      role: 'admin',
    })

    await admin.save()

    console.log('✅ Admin user created successfully!')
    console.log('📧 Email:', adminEmail)
    console.log('🔑 Password:', adminPassword)
    console.log('\n🚀 You can now login at: http://localhost:3000/admin-login')

    // Disconnect
    await mongoose.disconnect()
    console.log('✅ Database disconnected')
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
    process.exit(1)
  }
}

createAdminUser()
