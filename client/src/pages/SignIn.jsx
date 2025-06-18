import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'

const SignIn = () => {
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  
  console.log(formData);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await axios.post("http://localhost:3000/api/auth/signin", formData);
      console.log("✅ Signin success:", res.data);
      dispatch(signInSuccess(res.data));
      navigate("/")
    } catch (error) {
      console.error("❌ Signin error:", error.response?.data || error.message);
      dispatch(signInFailure(error.response?.data || error.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input 
          type="email" 
          placeholder="Email" 
          className='border border-gray-500 p-3 bg-white rounded-lg' 
          id='email' 
          onChange={handleChange}
        />
        <input 
          type="password" 
          placeholder="Password" 
          className='border border-gray-500 p-3 bg-white rounded-lg' 
          id='password' 
          onChange={handleChange}
        />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          Sign In
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
    </div>
  )
}

export default SignIn