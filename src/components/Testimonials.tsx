export function Testimonials() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <p>"Amazing experience!"</p>
            <p className="font-semibold mt-4">- John Doe</p>
          </div>
          {/* Add more testimonials */}
        </div>
      </div>
    </section>
  )
}