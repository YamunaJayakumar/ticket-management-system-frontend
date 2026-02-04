import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginAPI } from '../services/AllAPI'

function Login() {
    const navigate=useNavigate()
    const [formdata,setFormData]=useState({
        email:"",password:""
    })
    const handleChange=(e)=>{
       setFormData({
  ...formdata,
  [e.target.name]: e.target.value
})

    }
    const handlelogin=async(e)=>{
        e.preventDefault();
        const {email,password}=formdata
        if(!email || !password){
            console.log("please fill the fields");
            
        }
        try{
            const result = await loginAPI({email,password})
            if(result.status==200){
                alert("login successfull")
                navigate('/dashboard')
        
            }
            else{
                console.log(result);
                alert("something went wrong")
            }

        }catch(err){
            console.log(err);
            alert("login failed")
            
        }


        

    }
  return (
    <div> 
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">

          <h2 className="text-2xl font-bold text-center mb-6">
            Login
          </h2>

          <form onSubmit={handlelogin}>
            {/* Email */}
            <input
            name ="email"
            onChange={handleChange}
            value ={formdata.email}
            
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Password */}
            <input
            name="password"
            onChange={handleChange}
            value={formdata.password}
            
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <button onClick={()=>navigate("/")} className="text-blue-600 cursor-pointer" >Register
          </button>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Login