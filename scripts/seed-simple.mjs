import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/goodtime-adventure';

// Define schemas inline
const itinerarySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  details: { type: String, required: true },
});

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
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'user' },
  wishlist: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String },
  content: { type: String, required: true },
  coverImage: { type: String },
  tags: [{ type: String }],
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const galleryItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Tour = mongoose.models.Tour || mongoose.model('Tour', tourSchema);
const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema);
const GalleryItem = mongoose.models.GalleryItem || mongoose.model('GalleryItem', galleryItemSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, {
      writeConcern: { w: 1 },
      journal: false
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Tour.deleteMany({});
    await BlogPost.deleteMany({});
    await GalleryItem.deleteMany({});
    console.log('✓ Cleared existing collections');

    // Create admin user
    const hashedPassword = await bcrypt.hash('Admin123!', 12);
    await User.create({
      name: 'Admin',
      email: 'admin@goodtimeadventure.test',
      passwordHash: hashedPassword,
      role: 'admin',
      wishlist: [],
    });
    console.log('✓ Admin user created');

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
        overview: 'Trek to the base camp of the world\'s highest mountain. Experience the Himalayas up close with stunning views of Mt. Everest, Lhotse, and Nuptse.',
        includes: ['Guide', 'Permits', 'Meals', 'Accommodation', 'Porter'],
        excludes: ['Flights', 'Personal expenses', 'Acclimatization days'],
        itinerary: [
          { day: 1, title: 'Arrival in Kathmandu', details: 'Transfer to hotel and rest' },
          { day: 2, title: 'Fly to Lukla', details: 'Start trekking to Phakding' },
          { day: 3, title: 'Phakding to Namche Bazaar', details: 'Acclimatization day' },
          { day: 4, title: 'Namche to Tengboche', details: 'Visit Tengboche Monastery' },
          { day: 5, title: 'Tengboche to Dingboche', details: 'High altitude acclimatization' },
          { day: 6, title: 'Dingboche rest day', details: 'Acclimatization hike' },
          { day: 7, title: 'Dingboche to Lobuche East', details: 'Continue to higher altitude' },
          { day: 8, title: 'Lobuche East to Gorakshep', details: 'Early morning hike to EBC' },
          { day: 9, title: 'Everest Base Camp day', details: 'Reach EBC and return to Gorakshep' },
          { day: 10, title: 'Gorakshep to Kalapatthar', details: 'Sunrise hike for best views' },
          { day: 11, title: 'Kalapatthar to Pheriche', details: 'Descent begins' },
          { day: 12, title: 'Pheriche to Namche', details: 'Continue descending' },
          { day: 13, title: 'Namche to Lukla', details: 'Final trekking day' },
          { day: 14, title: 'Fly to Kathmandu', details: 'Return to Kathmandu' },
        ],
        published: true,
        heroImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
          'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80'
        ],
      },
      {
        title: 'Mardi Himal Trek',
        slug: 'mardi-himal',
        region: 'Pokhara',
        activity: 'Trekking',
        durationDays: 4,
        difficulty: 'Moderate',
        maxAltitudeM: 4500,
        bestSeason: 'Spring/Autumn',
        priceFrom: 450,
        overview: 'Experience the stunning Mardi Himal trek, a hidden gem offering breathtaking panoramic views of the Annapurna and Dhaulagiri ranges. This underrated trek is perfect for those seeking solitude and pristine mountain beauty.',
        includes: ['Guide', 'Accommodation', 'Meals', 'Porter'],
        excludes: ['Flights', 'Personal expenses'],
        itinerary: [
          { day: 1, title: 'Pokhara to Kande', details: 'Drive 1.5 hours to Kande village (1,644m). Short walk to Forest Camp for acclimatization.' },
          { day: 2, title: 'Forest Camp to Mardi Himal Base Camp', details: 'Trek through beautiful forests and rhododendrons. Reach Mardi Himal Base Camp (3,580m) with stunning views.' },
          { day: 3, title: 'Mardi Himal Summit Day', details: 'Early morning ascent to Mardi Himal (4,500m). Panoramic views of Annapurna South, Mardi, Hiunchuli, Machapuchare, and Dhaulagiri. Return to Base Camp.' },
          { day: 4, title: 'Mardi Himal Base Camp to Pokhara', details: 'Trek down and drive back to Pokhara. End of trek.' },
        ],
        published: true,
        heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
          'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
        ],
      },
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
        overview: 'Complete circuit around the Annapurna massif. One of the most famous treks in the world offering diverse landscapes from lush tropical forests to high mountain passes.',
        includes: ['Guide', 'Permits', 'Meals', 'Accommodation', 'Porter'],
        excludes: ['Flights', 'Personal expenses'],
        itinerary: [
          { day: 1, title: 'Arrival in Pokhara', details: 'Start in Pokhara' },
          { day: 2, title: 'Pokhara to Bhulbhule', details: 'Trek through rice fields' },
          { day: 3, title: 'Bhulbhule to Besisahar', details: 'Forest trail and river valley' },
        ],
        published: true,
        heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
          'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80',
          'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80'
        ],
      },
      {
        title: 'Langtang Valley Trek',
        slug: 'langtang-valley',
        region: 'Langtang',
        activity: 'Trekking',
        durationDays: 7,
        difficulty: 'Easy to Moderate',
        maxAltitudeM: 3870,
        bestSeason: 'Spring/Autumn',
        priceFrom: 650,
        overview: 'Trek through the beautiful Langtang Valley, known as the Valley of Glaciers. Perfect for shorter treks with stunning views of snow-capped peaks and traditional Tamang villages.',
        includes: ['Guide', 'Permits', 'Meals', 'Accommodation', 'Porter'],
        excludes: ['Flights', 'Personal expenses'],
        itinerary: [
          { day: 1, title: 'Kathmandu to Syabrubesi', details: 'Drive and trek to Syabrubesi' },
          { day: 2, title: 'Syabrubesi to Lama Hotel', details: 'Trek through forests' },
          { day: 3, title: 'Lama Hotel to Langtang Village', details: 'River trail trek' },
        ],
        published: true,
        heroImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
          'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80'
        ],
      },
      {
        title: 'Ghorepani Poon Hill Trek',
        slug: 'ghorepani-poon-hill',
        region: 'Annapurna',
        activity: 'Trekking',
        durationDays: 5,
        difficulty: 'Easy',
        maxAltitudeM: 3210,
        bestSeason: 'Spring/Autumn',
        priceFrom: 350,
        overview: 'An easy and popular trek offering spectacular sunrise views over the Annapurna and Dhaulagiri ranges from Poon Hill. Perfect for beginners and families.',
        includes: ['Guide', 'Accommodation', 'Meals', 'Porter'],
        excludes: ['Flights', 'Personal expenses'],
        itinerary: [
          { day: 1, title: 'Pokhara to Nayapul', details: 'Drive and begin trek' },
          { day: 2, title: 'Nayapul to Ulleri', details: 'Climb stone steps' },
          { day: 3, title: 'Ulleri to Ghorepani', details: 'Continue climbing' },
        ],
        published: true,
        heroImage: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80',
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
          'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80'
        ],
      },
      {
        title: 'Manaslu Circuit Trek',
        slug: 'manaslu-circuit',
        region: 'Manaslu',
        activity: 'Trekking',
        durationDays: 18,
        difficulty: 'Challenging',
        maxAltitudeM: 5160,
        bestSeason: 'Spring/Autumn',
        priceFrom: 2000,
        overview: 'Trek around Mount Manaslu, the 8th highest mountain in the world. A challenging trek with stunning views and authentic Tibetan culture.',
        includes: ['Guide', 'Permits', 'Meals', 'Accommodation', 'Porter'],
        excludes: ['Flights', 'Personal expenses'],
        itinerary: [
          { day: 1, title: 'Kathmandu to Arughat', details: 'Drive to Arughat' },
          { day: 2, title: 'Arughat to Sotikhola', details: 'Trek starts' },
        ],
        published: true,
        heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
          'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80',
          'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
        ],
      },
      {
        title: 'Makalu Base Camp Trek',
        slug: 'makalu-base-camp',
        region: 'Makalu',
        activity: 'Trekking',
        durationDays: 16,
        difficulty: 'Challenging',
        maxAltitudeM: 4680,
        bestSeason: 'Spring/Autumn',
        priceFrom: 1950,
        overview: 'Trek to the base camp of Mount Makalu, the 5th highest mountain in the world. An off-the-beaten-path adventure with pristine mountain beauty.',
        includes: ['Guide', 'Permits', 'Meals', 'Accommodation', 'Porter'],
        excludes: ['Flights', 'Personal expenses'],
        itinerary: [
          { day: 1, title: 'Kathmandu to Tumlingtar', details: 'Fly to Tumlingtar' },
          { day: 2, title: 'Tumlingtar to Khandbari', details: 'Trek starts' },
        ],
        published: true,
        heroImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
          'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80'
        ],
      },
      {
        title: 'Kailash Mansarovar Trek',
        slug: 'kailash-mansarovar',
        region: 'Tibet',
        activity: 'Trekking',
        durationDays: 22,
        difficulty: 'Very Challenging',
        maxAltitudeM: 5645,
        bestSeason: 'Summer',
        priceFrom: 3500,
        overview: 'Sacred pilgrimage trek around Mount Kailash and Mansarovar Lake. A spiritual and challenging adventure at high altitude in Tibet.',
        includes: ['Guide', 'Permits', 'Meals', 'Accommodation', 'Porter', 'Special permits'],
        excludes: ['Flights', 'Personal expenses'],
        itinerary: [
          { day: 1, title: 'Kathmandu to Lhasa', details: 'Fly to Lhasa' },
          { day: 2, title: 'Acclimatization in Lhasa', details: 'Rest and explore' },
        ],
        published: true,
        heroImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
          'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80',
          'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80'
        ],
      }
    ];

    const result = await Tour.insertMany(tours);
    console.log(`✓ insertMany returned ${result.length} documents`);
    
    // Verify tours were inserted one by one
    for (const tour of tours) {
      const found = await Tour.findOne({ slug: tour.slug });
      if (!found) {
        console.error(`❌ Tour not found after insert: ${tour.title}`);
      } else {
        console.log(`  ✓ Verified: ${found.title}`);
      }
    }
    
    const tourCount = await Tour.countDocuments();
    console.log(`✓ Total tours in database: ${tourCount}`);

    // Create blog posts
    const blogPosts = [
      {
        title: 'Top 10 Trekking Tips',
        slug: 'top-10-trekking-tips',
        excerpt: 'Essential tips for your trekking adventure.',
        content: '## Top 10 Trekking Tips\n\nTrekking in the Himalayas is an amazing experience.',
        coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        tags: ['tips', 'trekking', 'nepal'],
        published: true,
      },
      {
        title: 'Mardi Himal: The Hidden Gem of Nepal',
        slug: 'mardi-himal-hidden-gem',
        excerpt: 'Discover why Mardi Himal is one of the most underrated treks in Nepal.',
        content: '## Mardi Himal Trek\n\nMardi Himal is a beautiful trek.',
        coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        tags: ['mardi-himal', 'nepal', 'trek'],
        published: true,
      },
    ];

    await BlogPost.insertMany(blogPosts);
    console.log('✓ Blog posts created');

    // Create gallery items
    const galleryItems = [
      {
        title: 'Everest Base Camp',
        imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
        category: 'Trekking',
      },
      {
        title: 'Mardi Himal Summit',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        category: 'Trekking',
      },
      {
        title: 'Annapurna Panorama',
        imageUrl: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80',
        category: 'Mountain Views',
      },
      {
        title: 'Langtang Valley',
        imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
        category: 'Valley',
      },
    ];

    await GalleryItem.insertMany(galleryItems);
    console.log('✓ Gallery items created');

    console.log('✅ Seeding completed successfully');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    // Add a small delay to ensure writes are flushed
    await new Promise(resolve => setTimeout(resolve, 1000));
    await mongoose.disconnect();
    console.log('✓ Database disconnected');
  }
}

seed();
