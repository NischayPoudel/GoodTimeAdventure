import { MongoClient } from 'mongodb'

const uri = 'mongodb+srv://GoodTimeAdventure:goodtime123@cluster0.b2tjnpz.mongodb.net/goodtime-adventure'

const blogs = [
  {
    title: 'Everest Base Camp: The Journey to the World\'s Highest Peak',
    slug: 'everest-base-camp-journey',
    excerpt: 'Experience the adventure of a lifetime as we trek to the base camp of Mount Everest, the world\'s highest mountain.',
    content: `Trekking to Everest Base Camp is one of the most iconic adventures in the world. This 12-14 day journey takes you through stunning Himalayan landscapes, from rhododendron forests to alpine meadows.

The trek starts in Lukla, a small mountain village, and gradually ascends through the Khumbu region. You'll pass through charming Sherpa villages, cross suspension bridges over roaring rivers, and experience the unique culture of the Himalayan people.

One of the highlights is reaching Everest Base Camp at 5,364 meters, where climbers prepare for their summit attempts. From here, you can see Everest, Lhotse, and Makalu - three of the world's highest mountains.

The experience is transformative. You'll meet fellow trekkers from around the world, stay in cozy teahouses, and push your physical limits while immersing yourself in one of the most spectacular landscapes on Earth.

Whether you're a seasoned trekker or attempting your first major trek, the Everest Base Camp trek offers an unforgettable experience that will stay with you forever.`,
    author: 'Sarah Chen',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    published: true,
    createdAt: new Date('2024-12-15'),
  },
  {
    title: 'Annapurna Circuit: Nepal\'s Most Beautiful Trek',
    slug: 'annapurna-circuit-trek',
    excerpt: 'Discover why the Annapurna Circuit is considered one of the most beautiful treks in Nepal.',
    content: `The Annapurna Circuit is a 21-day trek that encircles the Annapurna Massif, offering some of the most diverse and stunning scenery in the Himalayas. This trek takes you through multiple climate zones, from subtropical forests to alpine deserts.

Starting from Besisahar, the trek gradually ascends through rhododendron and oak forests, crosses the Thorung La Pass at 5,416 meters, and descends through the Mustang region with its distinctive landscape of red cliffs and ancient Tibetan settlements.

What makes the Annapurna Circuit special is its incredible diversity. You'll experience lush green forests, high altitude plateaus, deep canyons, and snow-capped peaks all in one trek. The local culture is equally rich, with opportunities to interact with Gurung, Magar, and Thakali communities.

The circuit is well-developed with numerous teahouses providing comfortable accommodation and meals. This makes it accessible for trekkers of varying fitness levels. The variety of terrain and culture makes each day of the trek unique and memorable.

Many consider the Annapurna Circuit to be the perfect balance of adventure, culture, and natural beauty. It's a trek that will challenge you physically while rewarding you with some of the most spectacular views in the world.`,
    author: 'Michael Roberts',
    image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80',
    published: true,
    createdAt: new Date('2024-12-10'),
  },
  {
    title: 'Langtang Valley Trek: Hidden Gem of Nepal',
    slug: 'langtang-valley-trek',
    excerpt: 'Explore the lesser-known beauty of Langtang Valley, perfect for trekkers seeking a quieter Himalayan experience.',
    content: `The Langtang Valley Trek is one of Nepal's best-kept secrets. While often overshadowed by Everest and Annapurna treks, the Langtang offers stunning mountain views, pristine nature, and authentic local culture without the crowds.

This 7-day trek starts from Kathmandu and takes you through lush forests, charming Tamang villages, and up to Kyanjin Gompa at 3,870 meters, where you can enjoy spectacular views of the Langtang Himalayas.

The trek is shorter and more accessible than other major Himalayan treks, making it perfect for first-time trekkers or those with limited time. The terrain is varied, passing through dense rhododendron and pine forests, alpine meadows, and high-altitude terrain.

One of the highlights of the trek is the opportunity to visit Kyanjin Gompa, a Tibetan Buddhist monastery nestled in a stunning mountain valley. From here, you can take day trips to explore the surrounding peaks and glaciers.

The Langtang Valley Trek offers a perfect balance of accessibility and adventure. You'll experience pristine natural beauty, authentic mountain culture, and return to Kathmandu refreshed and rejuvenated. It's an ideal trek for those seeking an authentic Himalayan experience away from the beaten path.`,
    author: 'Emma Wilson',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80',
    published: true,
    createdAt: new Date('2024-12-05'),
  },
  {
    title: 'Manaslu Circuit: The Adventure Seeker\'s Paradise',
    slug: 'manaslu-circuit-trek',
    excerpt: 'Challenge yourself on the Manaslu Circuit, one of Nepal\'s most remote and rewarding treks.',
    content: `The Manaslu Circuit Trek is for adventurers seeking a more challenging and remote Himalayan experience. This 18-day trek circumnavigates Manaslu (8,163m), the world's eighth-highest mountain, and takes you through pristine wilderness areas rarely visited by tourists.

The trek is more demanding than other popular routes, but the rewards are immense. You'll traverse multiple high passes, including the Larkya La Pass at 5,160 meters, and experience dramatic changes in landscape and culture.

The route passes through the Nubri and Sumi valleys, home to Gurung and Tibetan communities who maintain traditional lifestyles. You'll encounter monasteries, prayer flags, and the spiritual essence of Himalayan Buddhism.

Wildlife enthusiasts will appreciate the diverse fauna of the region, including Himalayan tahr, musk deer, and various bird species. The flora is equally impressive, with medicinal herbs and unique alpine plants.

This trek is ideal for experienced trekkers with good fitness levels and acclimatization experience. The Manaslu Circuit offers solitude, natural beauty, and spiritual enrichment that few other treks can match. It's a trek that will test your limits and transform your perspective on mountain trekking.`,
    author: 'James Patterson',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    published: true,
    createdAt: new Date('2024-11-30'),
  },
  {
    title: 'Trekking Ethics: Responsible Mountain Adventures',
    slug: 'trekking-ethics',
    excerpt: 'Learn about sustainable and responsible trekking practices to protect Nepal\'s mountains and communities.',
    content: `As the popularity of Himalayan trekking increases, it's crucial to trek responsibly and ethically. Trekking should benefit local communities and preserve the natural environment for future generations.

Responsible trekking practices include:

1. Supporting Local Communities: Stay in locally-owned teahouses, hire local guides and porters, and purchase goods from local vendors. This ensures your money directly benefits the community.

2. Environmental Conservation: Carry out all waste, use refillable water bottles, and avoid single-use plastics. Choose trekking companies that are committed to environmental sustainability.

3. Cultural Respect: Learn about local customs, dress appropriately, and be respectful when photographing or interacting with locals. Ask permission before taking photos.

4. Fair Labor Practices: Ensure guides and porters are paid fairly, work in safe conditions, and have proper equipment and rest days.

5. Minimizing Carbon Footprint: When possible, arrange group treks to share transportation costs and environmental impact.

6. Supporting Conservation: Consider supporting local conservation organizations and environmental initiatives.

By trekking responsibly, you become part of the solution to preserve Nepal's magnificent mountains and support its communities. Every trekker has the power to make a positive impact. Choose your trekking operator wisely and trek with consciousness and respect for the places and people you visit.`,
    author: 'Dr. Ramesh Sharma',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    published: true,
    createdAt: new Date('2024-11-25'),
  },
  {
    title: 'Acclimatization and Altitude Sickness: Complete Guide',
    slug: 'altitude-acclimatization-guide',
    excerpt: 'Everything you need to know about acclimatization and how to prevent altitude sickness on high altitude treks.',
    content: `Altitude sickness is a serious concern when trekking at high altitudes. Understanding acclimatization and taking preventive measures is essential for a safe and enjoyable trekking experience.

What is Altitude Sickness?
Altitude sickness occurs when your body doesn't get enough oxygen at high elevations. Symptoms range from mild headaches and fatigue to severe conditions like High Altitude Cerebral Edema (HACE).

Prevention Strategies:
1. Gradual Ascent: Ascend slowly to allow your body to acclimatize. The golden rule is to gain no more than 500m per day above 2,500m.

2. Stay Hydrated: Drink 3-4 liters of water daily at altitude to help your body adjust.

3. Avoid Alcohol: Alcohol can exacerbate altitude sickness symptoms.

4. Eat Well: Consume high-carbohydrate foods which require less oxygen to metabolize.

5. Rest: Take acclimatization days to rest and allow your body to adjust.

6. Medication: Consider medications like Diamox (Acetazolamide) if recommended by your doctor.

Symptoms to Watch:
- Mild: Headache, fatigue, dizziness
- Moderate: Nausea, loss of appetite, difficulty sleeping
- Severe: Confusion, difficulty walking, blue lips

If symptoms worsen, descend immediately and seek medical attention.

With proper planning, acclimatization, and awareness, most trekkers can safely enjoy high-altitude trekking without experiencing serious altitude sickness.`,
    author: 'Dr. Lisa Thompson',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    published: true,
    createdAt: new Date('2024-11-20'),
  },
]

async function seedBlogs() {
  try {
    const client = new MongoClient(uri)
    await client.connect()
    const db = client.db('goodtime-adventure')
    const collection = db.collection('blogposts')

    // Delete existing blogs
    await collection.deleteMany({})

    // Insert new blogs
    const result = await collection.insertMany(blogs)
    console.log(`✅ Blogs seeded successfully: ${result.insertedCount} blogs added`)

    await client.close()
  } catch (error) {
    console.error('❌ Error seeding blogs:', error)
    process.exit(1)
  }
}

seedBlogs()
