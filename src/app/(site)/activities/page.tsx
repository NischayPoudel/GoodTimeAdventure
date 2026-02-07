import { connectDB } from '@/lib/db'
import { Tour } from '@/lib/models/Tour'
import { Activities } from '@/components/Activities'

export default async function ActivitiesPage() {
  try {
    await connectDB()
    const tours = await Tour.find({ published: true }).sort({ createdAt: -1 }).lean()
    
    // Convert MongoDB objects to plain JavaScript objects
    const toursData = JSON.parse(JSON.stringify(tours))
    
    console.log('🔍 DEBUG: Found tours:', toursData.length)
    if (toursData.length > 0) {
      console.log('🔍 First tour:', toursData[0].title, toursData[0].activity)
    }

    return <Activities tours={toursData} />
  } catch (error) {
    console.error('❌ Error fetching tours:', error)
    return <Activities tours={[]} />
  }
}