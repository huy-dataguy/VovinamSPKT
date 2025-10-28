import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import axios from "axios"
import getBaseUrl from '../utils/getBaseUrl'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const [message, setMessage] = useState("")
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
        headers: { 'Content-Type': 'application/json' }
      })
      const auth = response.data

      if(auth.token) {
        localStorage.setItem('token', auth.token)
        setTimeout(() => {
          localStorage.removeItem('token')
          alert('Token has expired! Please login again.')
          navigate("/")
        }, 3600 * 1000)
      }

      alert("Admin Login successful!")
      navigate("/matches")
    } catch (error) {
      setMessage("Please provide a valid username and password") 
      console.error(error)
    }
  }

  return (
    <div className='flex justify-center mt-20 mb-20'>
      <div className='w-full max-w-sm bg-white shadow-lg rounded-lg px-8 py-10'>
        <h2 className='text-2xl font-semibold mb-6 text-center'>Admin Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-medium mb-2' htmlFor="username">
              Username
            </label>
            <input 
              {...register("username", { required: true })} 
              type="text" name="username" id="username" placeholder='Username'
              className='shadow-sm border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
            {errors.username && <p className='text-red-500 text-xs mt-1'>Username is required</p>}
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-medium mb-2' htmlFor="password">
              Password
            </label>
            <input 
              {...register("password", { required: true })} 
              type="password" name="password" id="password" placeholder='Password'
              className='shadow-sm border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
            {errors.password && <p className='text-red-500 text-xs mt-1'>Password is required</p>}
          </div>

          {message && <p className='text-red-500 text-xs italic mb-4'>{message}</p>}

          <button 
            type="submit"
            className='bg-blue-500 w-full hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
          >
            Login
          </button>
        </form>

        <p className='mt-6 text-center text-gray-500 text-xs'>
          ©2025 VovinamHCMUTE. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default AdminLogin
