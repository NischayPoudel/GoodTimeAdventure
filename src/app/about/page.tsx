export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 pt-32">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">About Goodtime Adventure</h1>
          <p className="text-xl text-gray-600">
            Since 2015, we've been crafting unforgettable mountain experiences and connecting adventurers with the majestic Himalayas of Nepal.
          </p>
        </div>

        {/* Mission Vision Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 bg-gray-50 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To provide authentic, safe, and transformative trekking experiences while supporting local communities and preserving the pristine mountain environment of Nepal.
            </p>
          </div>
          <div className="p-8 bg-gray-50 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To become the most trusted and responsible trekking company in Nepal, recognized for our exceptional service, safety standards, and commitment to sustainable tourism.
            </p>
          </div>
          <div className="p-8 bg-gray-50 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
            <p className="text-gray-600">
              Integrity, safety, respect for local culture, environmental stewardship, and customer satisfaction guide every decision we make.
            </p>
          </div>
        </div>

        {/* Our Story */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-gray-600 text-lg mb-4">
            Goodtime Adventure was founded by a group of passionate mountaineers and guides who shared a vision: to create an adventure company that didn't just take people on treks, but truly connected them with Nepal's mountains, culture, and people.
          </p>
          <p className="text-gray-600 text-lg mb-4">
            Starting with small groups and a handful of dedicated guides, we've grown into one of Nepal's most respected trekking companies. But despite our growth, we've never lost sight of what makes us special: personalized service, authentic experiences, and an unwavering commitment to safety and sustainability.
          </p>
          <p className="text-gray-600 text-lg">
            Today, thousands of adventurers have trekked with us across Nepal's magnificent mountains. Each journey strengthens our belief that responsible tourism can be a force for good—enriching travelers while supporting local communities and preserving the natural environment for future generations.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why Choose Goodtime Adventure</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="text-3xl font-bold text-gray-900 flex-shrink-0">✓</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Local Guides</h3>
                <p className="text-gray-600">
                  Our guides are certified mountaineers with 10+ years of experience. They're not just knowledgeable—they're passionate about sharing Nepal's beauty and culture.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl font-bold text-gray-900 flex-shrink-0">✓</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Safety First Approach</h3>
                <p className="text-gray-600">
                  We maintain the highest safety standards with comprehensive insurance, emergency protocols, satellite communication, and medical support on all treks.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl font-bold text-gray-900 flex-shrink-0">✓</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Itineraries</h3>
                <p className="text-gray-600">
                  We tailor each trek to your fitness level, interests, and pace. No one-size-fits-all approach—just adventures customized for you.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl font-bold text-gray-900 flex-shrink-0">✓</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Community & Environmental Commitment</h3>
                <p className="text-gray-600">
                  We ensure fair wages for local staff, support community development projects, and implement strict environmental conservation practices.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl font-bold text-gray-900 flex-shrink-0">✓</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-gray-600">
                  Before, during, and after your trek, we're here to help. Our support team is available around the clock for any questions or emergencies.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl font-bold text-gray-900 flex-shrink-0">✓</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Small Group Philosophy</h3>
                <p className="text-gray-600">
                  We keep groups small (4-8 people maximum) to ensure personalized attention and authentic interactions with local communities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Highlights */}
        <div className="bg-gray-50 p-12 rounded-lg mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">By The Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">8+</div>
              <p className="text-gray-600">Years of Excellence</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">3000+</div>
              <p className="text-gray-600">Happy Trekkers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">50+</div>
              <p className="text-gray-600">Expert Guides & Staff</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">15+</div>
              <p className="text-gray-600">Unique Trek Routes</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-900 text-white p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Your Adventure?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of adventurers who have discovered the magic of Nepal's mountains with Goodtime Adventure.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/activities" className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition">
              Explore Treks
            </a>
            <a href="/contact" className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition">
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}