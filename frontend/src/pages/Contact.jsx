import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-3xl">🤖</span>
              <span className="text-xl font-bold text-gradient">AI Apply</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-blue-600 font-semibold transition-colors duration-200"
              >
                Contact Us
              </Link>
              <Link
                to="/register"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="text-6xl mb-4">📧</div>
          <h1 className="text-5xl font-bold text-gradient mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            Have questions? We're here to help!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="card animate-slide-in-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-3">✉️</span>
              Send Us a Message
            </h2>
            
            {submitted ? (
              <div className="bg-green-100 border border-green-200 text-green-800 p-6 rounded-xl text-center">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p>Thank you for contacting us. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="input-modern"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="input-modern"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className="input-modern"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more..."
                    rows="5"
                    className="input-modern resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary py-3 font-semibold"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-6 animate-slide-in-right">
            {/* Email */}
            <div className="card bg-blue-50 border-2 border-blue-200">
              <div className="flex items-start">
                <div className="text-4xl mr-4">📧</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Email Us</h3>
                  <p className="text-gray-700 mb-2">
                    For general inquiries and support
                  </p>
                  <a 
                    href="mailto:support@aiapply.com" 
                    className="text-blue-600 hover:text-blue-700 font-semibold text-lg"
                  >
                    support@aiapply.com
                  </a>
                </div>
              </div>
            </div>

            {/* Live Chat */}
            <div className="card bg-green-50 border-2 border-green-200">
              <div className="flex items-start">
                <div className="text-4xl mr-4">💬</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Live Chat</h3>
                  <p className="text-gray-700 mb-2">
                    Available Monday - Friday
                  </p>
                  <p className="text-green-600 font-semibold text-lg">
                    9:00 AM - 5:00 PM EST
                  </p>
                </div>
              </div>
            </div>

            {/* GitHub */}
            <div className="card bg-purple-50 border-2 border-purple-200">
              <div className="flex items-start">
                <div className="text-4xl mr-4">🐙</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">GitHub Issues</h3>
                  <p className="text-gray-700 mb-2">
                    Report bugs or request features
                  </p>
                  <a 
                    href="https://github.com/risuraj/ai-apply/issues" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 font-semibold text-lg"
                  >
                    View on GitHub →
                  </a>
                </div>
              </div>
            </div>

            {/* Documentation */}
            <div className="card bg-yellow-50 border-2 border-yellow-200">
              <div className="flex items-start">
                <div className="text-4xl mr-4">📚</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Documentation</h3>
                  <p className="text-gray-700 mb-2">
                    Learn how to use AI Apply
                  </p>
                  <a 
                    href="https://github.com/risuraj/ai-apply" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-yellow-600 hover:text-yellow-700 font-semibold text-lg"
                  >
                    Read the Docs →
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="card bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">🌐</span>
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl hover:bg-blue-600 transition-colors"
                  title="Twitter"
                >
                  🐦
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center text-2xl hover:bg-blue-800 transition-colors"
                  title="LinkedIn"
                >
                  💼
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center text-2xl hover:bg-gray-900 transition-colors"
                  title="GitHub"
                >
                  🐙
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="card mt-12 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-3">❓</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                How does AI Apply work?
              </h3>
              <p className="text-gray-700">
                AI Apply uses artificial intelligence to parse your resume, match you with suitable jobs, 
                and automate the application process. Simply upload your resume, set your preferences, 
                and let our AI handle the rest.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Is my data secure?
              </h3>
              <p className="text-gray-700">
                Yes! We use industry-standard encryption to protect your data. Your information is never 
                shared without your explicit consent, and you have full control over your profile and applications.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                How many jobs can I apply to?
              </h3>
              <p className="text-gray-700">
                You can set your own daily application limits in your preferences. We recommend quality over 
                quantity, and our AI helps you focus on the most suitable positions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Can I review applications before they're sent?
              </h3>
              <p className="text-gray-700">
                Yes! You have full control over the autopilot feature. You can review job matches, adjust 
                your preferences, and monitor all applications in your dashboard.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                What file formats are supported for resumes?
              </h3>
              <p className="text-gray-700">
                We currently support PDF and DOCX formats. Our AI parser works best with well-structured 
                resumes that clearly separate sections like education, experience, and skills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
