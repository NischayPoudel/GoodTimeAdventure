import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../src/lib/models/User.ts';
import { Tour } from '../src/lib/models/Tour.ts';
import { BlogPost } from '../src/lib/models/BlogPost.ts';
import { GalleryItem } from '../src/lib/models/GalleryItem.ts';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/goodtime-adventure';

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Tour.deleteMany({});
    await BlogPost.deleteMany({});
    await GalleryItem.deleteMany({});

    // Create admin user
    const hashedPassword = await bcrypt.hash('Admin123!', 12);
    await User.create({
      name: 'Admin',
      email: 'admin@goodtimeadventure.test',
      passwordHash: hashedPassword,
      role: 'admin',
      wishlist: [],
    });

    // Create sample tours
    const tours = [
      {
        title: 'Everest Base Camp',
        slug: 'everest-base-camp',
        region: 'Khumbu',
        activity: 'Trekking',
        durationDays: 14,
        difficulty: 'Challenging',
        maxAltitudeM: 5545,
        bestSeason: 'Spring/Autumn',
        priceFrom: 2500,
        overview: 'Trek to the base camp of the world\'s highest mountain.',
        includes: ['Guide', 'Permits', 'Meals'],
        excludes: ['Flights', 'Personal expenses'],
        itinerary: [
          { day: 1, title: 'Arrival in Kathmandu', details: 'Transfer to hotel' },
          { day: 2, title: 'Fly to Lukla', details: 'Start trekking' },
        ],
        published: true,
        heroImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306',
        gallery: ['https://images.unsplash.com/photo-1551632811-561732d1e306'],
      },
      // Add 5 more tours similarly
      {
        title: 'Annapurna Circuit',
        slug: 'annapurna-circuit',
        region: 'Annapurna',
        activity: 'Trekking',
        durationDays: 21,
        difficulty: 'Moderate',
        maxAltitudeM: 5416,
        bestSeason: 'Spring/Autumn',
        priceFrom: 1800,
        overview: 'Complete circuit around Annapurna massif.',
        includes: ['Guide', 'Permits', 'Meals'],
        excludes: ['Flights', 'Personal expenses'],
        itinerary: [
          { day: 1, title: 'Arrival', details: 'Start in Pokhara' },
        ],
        published: true,
        heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        gallery: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4'],
      },
      // Repeat for Langtang Valley, Mardi Himal, Ghorepani Poon Hill, Manaslu Circuit
    ];

    await Tour.insertMany(tours);

    // Create blog posts
    const blogPosts = [
      {
        title: 'Top 10 Trekking Tips',
        slug: 'top-10-trekking-tips',
        excerpt: 'Essential tips for your trekking adventure.',
        content: '## Introduction\n\nTrekking in the Himalayas...',
        coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        tags: ['tips', 'trekking'],
        published: true,
      },
      // Add 3 more
    ];

    await BlogPost.insertMany(blogPosts);

    // Create gallery items
    const galleryItems = [
      {
        title: 'Mountain View',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        category: 'Nature',
      },
      // Add 11 more
    ];

    await GalleryItem.insertMany(galleryItems);

    console.log('Seeding completed');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seed();