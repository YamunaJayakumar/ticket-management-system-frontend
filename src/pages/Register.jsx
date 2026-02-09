import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerAPI } from '../services/AllAPI';
import { FiUser, FiMail, FiLock, FiShield, FiCheckCircle, FiArrowRight } from 'react-icons/fi';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const result = await registerAPI({ name, email, password });
      if (result.status === 200) {
        alert("Registration Successful");
        navigate('/login');
      } else {
        alert("Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1e] via-[#111827] to-[#0f1419] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-5xl bg-gradient-to-br from-[#1a1f2e]/90 to-[#111827]/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-800/50 flex flex-col md:flex-row">

        {/* Left Section - Value Proposition */}
        <div className="md:w-1/2 p-12 bg-gradient-to-b from-teal-500/10 to-transparent border-r border-gray-800/50 flex flex-col justify-between">
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">TnRDesk</h1>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white leading-tight">
                Join the future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Incident Management.</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Empower your team with a centralized console designed for speed, clarity, and resolution.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-800/50 rounded-2xl flex items-center justify-center text-teal-400">
                  <FiShield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Enterprise Security</h3>
                  <p className="text-gray-500 text-sm">Roles-based access and encryption.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-800/50 rounded-2xl flex items-center justify-center text-teal-400">
                  <FiCheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Smart Triage</h3>
                  <p className="text-gray-500 text-sm">Automatic priority and categorization.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 text-gray-500 text-sm italic">
            "The fastest way to resolve high-priority tickets."
          </div>
        </div>

        {/* Right Section - Registration Form */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-8">
            <div className="text-center md:text-left space-y-2">
              <h3 className="text-3xl font-bold text-white">Create Account</h3>
              <p className="text-gray-400">Get started with your free workspace today.</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <div className="relative group">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition-colors" />
                <input
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-gray-800/30 border border-gray-700/50 text-white rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all placeholder-gray-600"
                  required
                />
              </div>

              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition-colors" />
                <input
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  type="email"
                  placeholder="Professional Email"
                  className="w-full bg-gray-800/30 border border-gray-700/50 text-white rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all placeholder-gray-600"
                  required
                />
              </div>

              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition-colors" />
                <input
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  type="password"
                  placeholder="Password"
                  className="w-full bg-gray-800/30 border border-gray-700/50 text-white rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all placeholder-gray-600"
                  required
                />
              </div>

              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition-colors" />
                <input
                  name="confirmPassword"
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full bg-gray-800/30 border border-gray-700/50 text-white rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all placeholder-gray-600"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-xl shadow-teal-500/10 hover:shadow-teal-500/20 flex items-center justify-center space-x-2 group mt-2"
              >
                <span>Register Workspace</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="text-center text-sm text-gray-500 pt-2">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-teal-400 hover:text-teal-300 font-bold transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
