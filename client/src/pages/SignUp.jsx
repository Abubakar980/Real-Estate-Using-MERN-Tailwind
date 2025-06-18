import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
const SignUp = () => {
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()
  const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      })
    }
    console.log(formData);
    
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:3000/api/auth/signup", formData);
    console.log("✅ Signup success:", res.data);
    navigate("/sign-in")
  } catch (error) {
    console.error("❌ Signup error:", error.response?.data || error.message);
  }
};

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder="Username" className='border border-gray-500 bg-white p-3 rounded-lg' id='username' onChange={handleChange}/>
        <input type="email" placeholder="Email" className='border border-gray-500 p-3 bg-white rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder="Password" className='border border-gray-500 p-3 bg-white rounded-lg' id='password' onChange={handleChange}/>
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign Up</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
        <span className='text-blue-700'>Sign In</span>
          </Link>
      </div>
    </div>
  )
}

export default SignUp