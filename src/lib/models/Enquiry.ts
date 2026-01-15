import mongoose from 'mongoose'

const enquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  travelDate: { type: Date, required: true },
  people: { type: Number, required: true },
  message: { type: String, required: true },
  tourId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  responded: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

export const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema)