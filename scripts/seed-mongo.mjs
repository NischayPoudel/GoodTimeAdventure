import { MongoClient } from 'mongodb';

const URI = 'mongodb+srv://GoodTimeAdventure:goodtime123@cluster0.b2tjnpz.mongodb.net/goodtime-adventure?appName=Cluster0';

async function seed() {
  const client = new MongoClient(URI);
  
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    const db = client.db('goodtime-adventure');
    
    console.log('✓ Connected');
    
    // Clear collections
    await db.collection('tours').deleteMany({});
    console.log('✓ Cleared tours');

    // Tours data
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
        includes: ['Guide', 'Permits', 'Meals', 'Accommodation', 'Porter'],
        excludes: ['Flights', 'Personal expenses'],
        itinerary: [{ day: 1, title: 'Arrival', details: 'Kathmandu' }],
        published: true,
        heroImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
        gallery: ['https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80'],
        createdAt: new Date()
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
        overview: 'Hidden gem trek with panoramic views.',
        includes: ['Guide', 'Accommodation', 'Meals', 'Porter'],
        excludes: ['Flights', 'Personal expenses'],
        itinerary: [{ day: 1, title: 'Trek start', details: 'Pokhara to Kande' }],
        published: true,
        heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        gallery: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'],
        createdAt: new Date()
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
        overview: 'Complete circuit around Annapurna massif.',
        includes: ['Guide', 'Permits', 'Meals', 'Accommodation', 'Porter'],
        excludes: ['Flights', 'Personal expenses'],
        itinerary: [{ day: 1, title: 'Start', details: 'Pokhara' }],
        published: true,
        heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        gallery: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'],
        createdAt: new Date()
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
        overview: 'Valley of Glaciers trek.',
        includes: ['Guide', 'Permits', 'Meals', 'Accommodation', 'Porter'],
        excludes: ['Flights', 'Personal expenses'],
        itinerary: [{ day: 1, title: 'Start', details: 'Kathmandu' }],
        published: true,
        heroImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
        gallery: ['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80'],
        createdAt: new Date()
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
        overview: 'Easy trek with spectacular sunrise views.',
        includes: ['Guide', 'Accommodation', 'Meals', 'Porter'],
        excludes: ['Flights', 'Personal expenses'],
        itinerary: [{ day: 1, title: 'Start', details: 'Pokhara' }],
        published: true,
        heroImage: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80',
        gallery: ['https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80'],
        createdAt: new Date()
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
        overview: 'Trek around 8th highest mountain.',
        includes: ['Guide', 'Permits', 'Meals', 'Accommodation', 'Porter'],
        excludes: ['Flights', 'Personal expenses'],
        itinerary: [{ day: 1, title: 'Start', details: 'Kathmandu' }],
        published: true,
        heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        gallery: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'],
        createdAt: new Date()
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
        overview: 'Trek to 5th highest mountain base camp.',
        includes: ['Guide', 'Permits', 'Meals', 'Accommodation', 'Porter'],
        excludes: ['Flights', 'Personal expenses'],
        itinerary: [{ day: 1, title: 'Start', details: 'Kathmandu' }],
        published: true,
        heroImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
        gallery: ['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80'],
        createdAt: new Date()
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
        overview: 'Sacred pilgrimage trek in Tibet.',
        includes: ['Guide', 'Permits', 'Meals', 'Accommodation', 'Porter', 'Special permits'],
        excludes: ['Flights', 'Personal expenses'],
        itinerary: [{ day: 1, title: 'Start', details: 'Lhasa' }],
        published: true,
        heroImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
        gallery: ['https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80'],
        createdAt: new Date()
      }
    ];

    // Insert tours
    const result = await db.collection('tours').insertMany(tours);
    console.log(`✓ Inserted ${result.insertedIds.length} tours`);
    
    // Verify
    const count = await db.collection('tours').countDocuments({ published: true });
    console.log(`✓ Verified: ${count} published tours in database`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await client.close();
    console.log('✓ Disconnected');
  }
}

seed();
