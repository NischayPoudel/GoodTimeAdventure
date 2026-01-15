import { ContactForm } from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-4">
            Have questions about our tours or need help planning your adventure?
            We'd love to hear from you!
          </p>
          <div className="space-y-2">
            <p><strong>Email:</strong> info@goodtimeadventure.com</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Address:</strong> 123 Adventure Street, Mountain City, MC 12345</p>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  )
}