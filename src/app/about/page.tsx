export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">About Goodtime Adventure</h1>
      <div className="max-w-4xl mx-auto">
        <p className="text-lg mb-6">
          Goodtime Adventure is your premier trekking company, specializing in unforgettable mountain adventures
          and cultural experiences in some of the world's most breathtaking destinations.
        </p>
        <p className="text-lg mb-6">
          With years of experience and a team of expert guides, we ensure safe, exciting, and memorable journeys
          for adventurers of all levels. Our commitment to sustainable tourism and local communities sets us apart.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-2">Expert Guides</h3>
            <p>Certified and experienced trekking guides</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-2">Safety First</h3>
            <p>Comprehensive safety measures and equipment</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-2">Sustainable Tourism</h3>
            <p>Responsible travel that benefits local communities</p>
          </div>
        </div>
      </div>
    </div>
  )
}