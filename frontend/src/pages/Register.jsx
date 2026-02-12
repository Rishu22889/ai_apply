import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../components/AuthContext'
import { api } from '../api'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !password || !confirmPassword) {
      setMessage('Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const result = await api.register({ email, password })
      
      if (result.success) {
        setMessage('✅ Account created successfully! Logging you in...')
        
        // Auto-login after successful registration
        setTimeout(async () => {
          try {
            const loginResult = await api.login({ email, password })
            if (loginResult.success) {
              login(loginResult)
              navigate('/upload-resume')
            }
          } catch (error) {
            navigate('/login')
          }
        }, 1500)
      } else {
        setMessage(`❌ ${result.message}`)
      }
    } catch (error) {
      setMessage(`❌ Registration failed: ${error.response?.data?.detail || error.message}`)
    } finally {
      setLoading(false)
    }
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

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Main Register Card */}
          <div className="card animate-fade-in-up">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🚀</div>
              <h1 className="text-3xl font-bold text-gradient mb-2">
                AI Job Engine
              </h1>
              <p className="text-gray-600">
                Create your account
              </p>
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input-modern"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password (min 6 characters)"
                  className="input-modern"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="input-modern"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'btn-success hover:scale-105'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="spinner mr-2"></div>
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 border-t border-gray-200"></div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Already have an account?
              </p>
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 border-2 border-green-500 text-green-500 font-semibold rounded-xl hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                Sign In →
              </Link>
            </div>

            {/* Message */}
            {message && (
              <div className={`mt-6 p-4 rounded-xl font-medium text-center ${
                message.includes('✅') 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {message}
              </div>
            )}
          </div>

          {/* Privacy Card */}
          <div className="card mt-6 bg-yellow-50 border border-yellow-200 animate-slide-in-right">
            <h4 className="text-lg font-bold text-yellow-800 mb-4 flex items-center">
              <span className="mr-2">🔒</span>
              Your Privacy Matters
            </h4>
            <div className="space-y-3">
              <div className="flex items-start text-yellow-700">
                <span className="w-6 h-6 bg-yellow-200 text-yellow-800 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">✓</span>
                <span>Your data is stored securely and never shared</span>
              </div>
              <div className="flex items-start text-yellow-700">
                <span className="w-6 h-6 bg-yellow-200 text-yellow-800 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">✓</span>
                <span>You control all application decisions</span>
              </div>
              <div className="flex items-start text-yellow-700">
                <span className="w-6 h-6 bg-yellow-200 text-yellow-800 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">✓</span>
                <span>AI assists but never acts without your approval</span>
              </div>
              <div className="flex items-start text-yellow-700">
                <span className="w-6 h-6 bg-yellow-200 text-yellow-800 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">✓</span>
                <span>Complete transparency in all operations</span>
              </div>
            </div>
          </div>

          {/* Getting Started Card */}
          <div className="card mt-6 bg-blue-50 border border-blue-200">
            <h4 className="text-lg font-bold text-blue-800 mb-4 flex items-center">
              <span className="mr-2">🎯</span>
              Getting Started
            </h4>
            <div className="text-sm text-blue-700 space-y-2">
              <div className="flex items-center">
                <span className="w-5 h-5 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-xs font-bold mr-2">1</span>
                <span>Upload your resume</span>
              </div>
              <div className="flex items-center">
                <span className="w-5 h-5 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-xs font-bold mr-2">2</span>
                <span>Complete your profile</span>
              </div>
              <div className="flex items-center">
                <span className="w-5 h-5 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-xs font-bold mr-2">3</span>
                <span>Let AI find perfect jobs</span>
              </div>
              <div className="flex items-center">
                <span className="w-5 h-5 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-xs font-bold mr-2">4</span>
                <span>Start applying automatically</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
