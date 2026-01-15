import mongoose from 'mongoose'

const galleryItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

export const GalleryItem = mongoose.models.GalleryItem || mongoose.model('GalleryItem', galleryItemSchema)