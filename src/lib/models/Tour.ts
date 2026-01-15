import mongoose from 'mongoose'

const itinerarySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  details: { type: String, required: true },
})

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  region: { type: String, required: true },
  activity: { type: String, required: true },
  durationDays: { type: Number, required: true },
  difficulty: { type: String, required: true },
  maxAltitudeM: { type: Number, required: true },
  bestSeason: { type: String, required: true },
  priceFrom: { type: Number, required: true },
  overview: { type: String, required: true },
  includes: [{ type: String }],
  excludes: [{ type: String }],
  itinerary: [itinerarySchema],
  published: { type: Boolean, default: false },
  heroImage: { type: String, required: true },
  gallery: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
})

export const Tour = mongoose.models.Tour || mongoose.model('Tour', tourSchema)