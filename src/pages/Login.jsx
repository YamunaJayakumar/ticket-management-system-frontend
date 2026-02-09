import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginAPI } from '../services/AllAPI'
import { FaBell, FaShieldAlt, FaComments } from 'react-icons/fa'

function Login() {
  const navigate = useNavigate()
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [formdata, setFormData] = useState({
    email: "", password: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }

  const handlelogin = async (e) => {
    e.preventDefault();
    const { email, password } = formdata
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }
    try {
      const result = await loginAPI({ email, password })
      if (result.status == 200) {
        console.log(result.data);
        const token = result.data.token;
        const user = result.data.existingUser
        // Store token in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user))

        alert("Login successful")
        if (user?.role == "admin") {
          navigate('/admin/dashboard')
        } else {
          navigate('/dashboard')
        }
      }
      else {
        console.log(result);
        alert("Invalid credentials")
      }

    } catch (err) {
      console.log(err);
      alert("Login failed. Please try again.")
    }
  }

  const handleSSOLogin = () => {
    alert("SSO integration coming soon!");
    // Implement SSO logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1e] via-[#111827] to-[#0f1419] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-gradient-to-br from-[#1a1f2e]/90 to-[#111827]/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-800/50">
        <div className="grid md:grid-cols-2 gap-0">
          
          {/* Left Section - Branding & Features */}
          <div className="p-12 flex flex-col justify-center space-y-8 border-r border-gray-800/50">
            
            {/* Logo and Tagline */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-white">TnRDesk</h1>
              </div>
              <p className="text-xs text-gray-400 tracking-widest uppercase">TRACK & RESOLVE</p>
            </div>

            {/* Main Heading */}
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-white leading-tight">
                Track, triage, and resolve<br />incidents faster.
              </h2>
              <p className="text-sm text-gray-400">
                Real-time visibility for enterprise teams and on-call engineers.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="mt-1 text-teal-400 transition-transform group-hover:scale-110">
                  <FaBell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Real-time alerts</h3>
                  <p className="text-gray-400 text-xs">Instant notifications</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="mt-1 text-teal-400 transition-transform group-hover:scale-110">
                  <FaShieldAlt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">SSO, MFA & RBAC</h3>
                  <p className="text-gray-400 text-xs">Bank-grade security</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="mt-1 text-teal-400 transition-transform group-hover:scale-110">
                  <FaComments className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Collaborative context</h3>
                  <p className="text-gray-400 text-xs">Comments & history</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Login Form */}
          <div className="p-12 flex flex-col justify-center">
            <div className="space-y-6">
              
              {/* Access Workspace Header */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-800/50 rounded-full mb-2">
                  <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Access Workspace</h3>
                <p className="text-sm text-gray-400">Sign in to continue to TnR-Desk</p>
              </div>

              {/* SSO Button */}
              {!showEmailForm && (
                <div className="space-y-4">
                  <button
                    onClick={handleSSOLogin}
                    className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.5" y="0.5" width="20" height="20" rx="2" fill="#F25022"/>
                      <rect x="11.5" y="0.5" width="9" height="9" fill="#7FBA00"/>
                      <rect x="0.5" y="11.5" width="9" height="9" fill="#00A4EF"/>
                      <rect x="11.5" y="11.5" width="9" height="9" fill="#FFB900"/>
                    </svg>
                    <span>Continue with Microsoft (SSO)</span>
                  </button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-[#1a1f2e] text-gray-400">OR</span>
                    </div>
                  </div>

                  {/* Email Sign In Link */}
                  <button
                    onClick={() => setShowEmailForm(true)}
                    className="w-full text-gray-300 hover:text-white py-3 px-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-200 font-medium"
                  >
                    Sign in with Email
                  </button>
                </div>
              )}

              {/* Email Form */}
              {showEmailForm && (
                <form onSubmit={handlelogin} className="space-y-4">
                  <div>
                    <input
                      name="email"
                      onChange={handleChange}
                      value={formdata.email}
                      type="email"
                      placeholder="Email address"
                      className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all placeholder-gray-500"
                      required
                    />
                  </div>

                  <div>
                    <input
                      name="password"
                      onChange={handleChange}
                      value={formdata.password}
                      type="password"
                      placeholder="Password"
                      className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all placeholder-gray-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Sign In
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowEmailForm(false)}
                    className="w-full text-gray-400 hover:text-gray-300 text-sm transition-colors"
                  >
                    ← Back to login options
                  </button>
                </form>
              )}

              {/* Support Link */}
              <div className="text-center pt-4">
                <p className="text-xs text-gray-500">
                  Need help?{" "}
                  <a href="#" className="text-teal-400 hover:text-teal-300 transition-colors">
                    Contact Support
                  </a>
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login