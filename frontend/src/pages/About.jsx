import React from 'react'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
                className="text-blue-600 font-semibold transition-colors duration-200"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
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
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="text-6xl mb-4">🤖</div>
          <h1 className="text-5xl font-bold text-gradient mb-4">About AI Apply</h1>
          <p className="text-xl text-gray-600">
            Revolutionizing Job Applications with Artificial Intelligence
          </p>
        </div>

        {/* What is AI Apply */}
        <div className="card mb-8 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-3">🎯</span>
            What is AI Apply?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            AI Apply is an intelligent job application automation platform that leverages cutting-edge artificial intelligence 
            to streamline your job search process. Built to save time and increase your chances of landing your dream job, 
            our platform analyzes your resume, matches you with suitable positions, and automates the application process 
            while maintaining personalization and quality.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you're a fresh graduate, experienced professional, or career changer, AI Apply adapts to your unique 
            profile and preferences to find the best opportunities for you.
          </p>
        </div>

        {/* Key Features */}
        <div className="card mb-8 animate-slide-in-right">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-3">✨</span>
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <div className="text-3xl mb-3">📄</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">AI Resume Parsing</h3>
              <p className="text-gray-700">
                Our advanced AI automatically extracts and structures your skills, education, work experience, 
                and achievements from your resume with high accuracy.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Intelligent Job Matching</h3>
              <p className="text-gray-700">
                AI analyzes 220+ job listings and ranks them based on your profile, providing detailed reasoning 
                for each match score to help you make informed decisions.
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Automated Applications</h3>
              <p className="text-gray-700">
                Set your preferences and let the autopilot apply to multiple jobs automatically with personalized 
                cover letters and application materials.
              </p>
            </div>

            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Application Tracking</h3>
              <p className="text-gray-700">
                Monitor all your applications in one centralized dashboard with real-time status updates 
                and comprehensive analytics.
              </p>
            </div>

            <div className="bg-red-50 p-6 rounded-xl border border-red-200">
              <div className="text-3xl mb-3">⚙️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Smart Constraints</h3>
              <p className="text-gray-700">
                Set daily application limits, preferred job types, locations, and other constraints to ensure 
                quality over quantity.
              </p>
            </div>

            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Privacy & Security</h3>
              <p className="text-gray-700">
                Your data is encrypted and secure. We never share your information without consent and maintain 
                full transparency in all operations.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="card mb-8 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-3">🚀</span>
            How It Works
          </h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Upload Your Resume</h3>
                <p className="text-gray-700">
                  Start by uploading your resume in PDF or DOCX format. Our AI will parse and extract all relevant 
                  information to build your professional profile.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Complete Your Profile</h3>
                <p className="text-gray-700">
                  Review and enhance your profile with additional details, preferences, and career goals to improve 
                  matching accuracy.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Browse AI-Ranked Jobs</h3>
                <p className="text-gray-700">
                  Explore job listings ranked by our AI based on your profile. Each job includes a match score and 
                  detailed reasoning.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Set Your Preferences</h3>
                <p className="text-gray-700">
                  Configure your application policy including daily limits, job types, locations, and other constraints 
                  to maintain quality.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                5
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Run Autopilot</h3>
                <p className="text-gray-700">
                  Activate the autopilot feature to automatically apply to suitable jobs. Monitor progress and track 
                  all applications in your dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="card mb-8 animate-slide-in-right">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-3">💻</span>
            Technology Stack
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">⚛️</div>
              <h4 className="font-bold text-gray-800">React 18</h4>
              <p className="text-sm text-gray-600">Modern UI Framework</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-bold text-gray-800">FastAPI</h4>
              <p className="text-sm text-gray-600">High-Performance Backend</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🤖</div>
              <h4 className="font-bold text-gray-800">OpenAI GPT</h4>
              <p className="text-sm text-gray-600">AI-Powered Intelligence</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🗄️</div>
              <h4 className="font-bold text-gray-800">SQLite</h4>
              <p className="text-sm text-gray-600">Reliable Database</p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🎨</div>
              <h4 className="font-bold text-gray-800">Tailwind CSS</h4>
              <p className="text-sm text-gray-600">Beautiful Styling</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">☁️</div>
              <h4 className="font-bold text-gray-800">Cloud Deployed</h4>
              <p className="text-sm text-gray-600">Vercel & Render</p>
            </div>
          </div>
        </div>

        {/* Creator Section */}
        <div className="card mb-8 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-3">👨‍💻</span>
            Built By
          </h2>
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                RR
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Risu Raj</h3>
              <p className="text-lg text-gray-700 mb-3">
                Full-Stack Developer & AI Enthusiast
              </p>
              <p className="text-gray-600 leading-relaxed">
                AI Apply was created to solve the time-consuming challenge of job applications. 
                By combining modern web technologies with artificial intelligence, this platform helps 
                job seekers focus on what matters most - preparing for interviews and building their careers.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center card bg-gradient-to-r from-blue-500 to-purple-600 text-white animate-fade-in-up">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-6 opacity-90">
            Join AI Apply today and let artificial intelligence accelerate your job search!
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Create Account
            </Link>
            <Link
              to="/login"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
