import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import getBaseUrl from '../utils/getBaseUrl';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [message, setMessage] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data);
      const { token } = response.data;

      if (token) {
        login(token); // ✅ cập nhật context + localStorage
        // alert("Admin Login successful!");
        navigate("/fighters");
      }
    } catch {
      setMessage("Please provide a valid username and password");
    }
  };

  return (
    <div className='flex justify-center mt-20 mb-20'>
      <div className='w-full max-w-sm bg-white shadow-lg rounded-lg px-8 py-10'>
        <h2 className='text-2xl font-semibold mb-6 text-center'>Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-medium mb-2'>Username</label>
            <input {...register("username", { required: true })} className='shadow-sm border rounded w-full py-2 px-3 focus:ring-2 focus:ring-blue-400' />
            {errors.username && <p className='text-red-500 text-xs mt-1'>Username is required</p>}
          </div>
          {/* Password */}
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-medium mb-2'>Password</label>
            <input {...register("password", { required: true })} type="password" className='shadow-sm border rounded w-full py-2 px-3 focus:ring-2 focus:ring-blue-400' />
            {errors.password && <p className='text-red-500 text-xs mt-1'>Password is required</p>}
          </div>
          {message && <p className='text-red-500 text-xs italic mb-4'>{message}</p>}
          <button type="submit" className='bg-blue-500 w-full hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
