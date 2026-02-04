import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerAPI } from '../services/AllAPI';

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister=async(e)=>{
     e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    // basic validation
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try{
      const result= await registerAPI({ name, email, password })
      if(result.status==200){
        alert("register successfull")
        navigate('/login')

      }else{
        console.log(result.data);
        
        alert("register failed")

      }

    }catch(err){
      console.log(err);
      alert("something went wrong")
      
    }



  }
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleRegister}>
          {/* Name */}
          <input
          onChange={handleChange}
          name="name"
          value={formData.name}
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Email */}
          <input
          name ='email'
          onChange={handleChange}
          value={formData.email}
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password */}
          <input
          name ="password"
          onChange={handleChange}
          value={formData.password}
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Confirm Password */}
          <input
          name ="confirmPassword"
          onChange={handleChange}
          value={formData.confirmPassword}
            type="password"
            placeholder="Confirm Password"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <button onClick={()=>navigate("/login")} className="text-blue-600 cursor-pointer" >
            Login
          </button>
        </p>

      </div>
    </div>
    </>
  )
}

export default Register