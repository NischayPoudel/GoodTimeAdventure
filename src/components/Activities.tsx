import { TourCard } from '@/components/TourCard'

interface ActivitiesProps {
  tours: any[]
}

export function Activities({ tours }: ActivitiesProps) {
  const activities = [
    { name: 'Trekking', description: 'Mountain trekking adventures', count: tours.filter(t => t.activity === 'Trekking').length },
    { name: 'Hiking', description: 'Scenic hiking trails', count: tours.filter(t => t.activity === 'Hiking').length },
    { name: 'Climbing', description: 'Rock and ice climbing expeditions', count: tours.filter(t => t.activity === 'Climbing').length },
    { name: 'Cultural Tours', description: 'Cultural and heritage tours', count: tours.filter(t => t.activity === 'Cultural').length },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Our Activities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {activities.map((activity) => (
          <div key={activity.name} className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-semibold mb-2">{activity.name}</h2>
            <p className="text-gray-600 mb-4">{activity.description}</p>
            <p className="text-lg font-bold text-blue-600">{activity.count} Tours</p>
          </div>
        ))}
      </div>
      <h2 className="text-3xl font-bold text-center mb-8">Available Tours</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <TourCard key={tour._id} tour={tour} />
        ))}
      </div>
    </div>
  )
}