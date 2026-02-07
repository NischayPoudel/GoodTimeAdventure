import bcryptjs from 'bcryptjs'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

async function createAdmin() {
  let client = null
  try {
    let mongoUrl = process.env.MONGODB_URI
    
    // Fallback to hardcoded URI if env not set
    if (!mongoUrl) {
      mongoUrl = 'mongodb+srv://GoodTimeAdventure:goodtime123@cluster0.b2tjnpz.mongodb.net/goodtime-adventure?appName=Cluster0'
      console.log('⚠️  Using hardcoded MongoDB URI')
    }

    console.log('📡 Connecting to MongoDB with MongoClient...')
    client = new MongoClient(mongoUrl)
    await client.connect()
    console.log('✅ Connected')

    // Use default database from URI
    const db = client.db()
    console.log('📚 Using database:', db.name || 'default from URI')

    // Delete all existing users
    const deleteResult = await db.collection('users').deleteMany({})
    console.log('🗑️  Deleted', deleteResult.deletedCount, 'existing users')

    // Hash password
    const password = 'Admin@12345'
    const passwordHash = await bcryptjs.hash(password, 12)

    // Create admin
    const result = await db.collection('users').insertOne({
      name: 'Administrator',
      email: 'admin@goodtimeadventure.com',
      passwordHash: passwordHash,
      role: 'admin',
      createdAt: new Date(),
    })

    console.log('✅ Admin user created!')
    console.log('📧 Email: admin@goodtimeadventure.com')
    console.log('🔑 Password: Admin@12345')
    console.log('🆔 User ID:', result.insertedId)

    // Verify it was created
    const user = await db.collection('users').findOne({ 
      email: 'admin@goodtimeadventure.com' 
    })
    
    if (user) {
      console.log('✅ Verification: User found in database!')
      console.log('   Email:', user.email)
      console.log('   Role:', user.role)
    }

    await client.close()
    console.log('✅ Done!')
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

createAdmin()
