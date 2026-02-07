import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Connect to DB
    const MONGODB_URI = process.env.MONGODB_URI
    if (!MONGODB_URI) {
      return NextResponse.json({ error: 'No MONGODB_URI' }, { status: 500 })
    }

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGODB_URI, { bufferCommands: false })
    }

    // Define User schema
    const userSchema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true, lowercase: true, trim: true },
      passwordHash: { type: String, required: true },
      role: { type: String, enum: ['user', 'admin'], default: 'user' },
      createdAt: { type: Date, default: Date.now },
    }, { collection: 'users' })

    const User = mongoose.models.User || mongoose.model('User', userSchema)

    // Find user
    const user = await User.findOne({ email: email.toLowerCase().trim() })

    if (!user) {
      return NextResponse.json({ 
        success: false, 
        message: 'User not found',
        debug: { email: email.toLowerCase().trim() }
      }, { status: 401 })
    }

    // Test password
    const isValid = await bcryptjs.compare(password, user.passwordHash)

    if (!isValid) {
      return NextResponse.json({ 
        success: false, 
        message: 'Password incorrect',
        debug: { 
          userEmail: user.email,
          passwordHashPrefix: user.passwordHash.substring(0, 20),
          passwordProvided: password,
          hashMatches: false
        }
      }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      message: 'Auth test passed!',
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message,
      success: false
    }, { status: 500 })
  }
}
