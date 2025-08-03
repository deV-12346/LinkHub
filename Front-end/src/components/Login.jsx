import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../axiosIntance'
import { useAppContext } from '../context/appContext'

const Login = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()
  const {user,setUser} = useAppContext()
  const handleSubmit = async(e) =>{
      try {
        e.preventDefault()
        const response = await axiosInstance.post("/user/login",{email,password})
        if(response.data.success){
          console.log(response.data.message) 
          toast.success(response.data.message)
          setUser(response.data.data)
          localStorage.setItem("user",JSON.stringify(response.data.data))
          setTimeout(()=>{
            navigate("/")
          },3000)
        }
      } catch (error) {
        toast.error(error.response?.data?.message)
      }
  }
  return (
    <div className='flex justify-center items-center bg-gray-200 h-screen w-full'>
        <div className=' w-80 md:w-110 rounded bg-white py-5'>
          <h1 className='text-2xl  font-medium text-center'>
          Login with <span className='text-red-500 font-bold'>L</span>
          ink
        <span className='text-red-500 font-bold'>H</span>ub</h1>
       <form className='px-7 md:px-10 py-3' onSubmit={handleSubmit}>

          <div className='my-2'>
           <p className='text-xl font-mono text-gray-600'>Email</p>
           <input type="email" placeholder='Enter Email...' className='w-full border-1 py-2 px-4 
           rounded border-gray-300 placeholder:font-mono placeholder:text-gray-300
           focus:scale-105 transition-all ease-in-out delay-300 duration-500 focus:outline-red-500 focus:outline-1
           focus:shadow-2xl focus:shadow-indigo-500'
            pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
           name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
          </div>
          
          <div className='my-2'>
           <p className='text-xl font-mono text-gray-600'>Password</p>
           <input type="password" placeholder='Enter Password...' className='w-full border-1 py-2 px-4 
           rounded border-gray-300 placeholder:font-mono placeholder:text-gray-300
           focus:scale-105 transition-all ease-in-out delay-300 duration-500 focus:outline-red-500 focus:outline-1
           focus:shadow-2xl focus:shadow-indigo-500' name="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
          </div>

           <div className='my-4 text-center'>
            <button type="submit" className='bg-indigo-500 py-2 px-7 rounded text-white
            font-bold hover:bg-indigo-300 transition-all ease-in-out delay-300 duration-500
            cursor-pointer'>
            Login
           </button>
          </div>
        </form>
        <div className='mx-10'>
           <Link to={"/register"} className='text-[15px] font-mono text-indigo-500'>
           Not register yet ?</Link>
        </div>
        </div>
    </div>
  )
}

export default Login