import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tour' }],
  createdAt: { type: Date, default: Date.now },
})

export const User = mongoose.models.User || mongoose.model('User', userSchema)