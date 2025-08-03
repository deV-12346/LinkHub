import React, { useState } from 'react'
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate,Link } from 'react-router-dom'
const Register = () => {
  const [values,setValues] = useState({
    name:"",
    email:"",
    bio:"",
    password:"",
    avatar:null
  })
  const navigate = useNavigate()
  const handleChange = (e) =>{
    const {name,value} = e.target;
    setValues({
      ...values,
      [name]:value
    })
  }
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("email", values.email);
  formData.append("password", values.password);
  formData.append("bio", values.bio);
  formData.append("avatar",values.avatar);
  const handleSubmit = async (e) =>{
    try {
      e.preventDefault()
      const response = await axios.post("http://localhost:5000/api/user/register",formData)
      if(response.data.success){
        console.log(response.data.message)
        toast.success(response.data.message)
        setTimeout(()=>{
          navigate("/login")
        },3000)
        setValues({
           name:"",
    email:"",
    bio:"",
    password:"",
    avatar:null
        })
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error?.response?.data?.message)
    }   
  }
  return (
    <div className='flex justify-center items-center bg-gray-400 h-screen md:h-180 w-full'>
     <div className='bg-white rounded h-auto w-80 md:w-110  py-5'>
        <h1 className='text-2xl  font-medium text-center'>
          Register with <span className='text-red-500 font-bold'>L</span>
          ink
        <span className='text-red-500 font-bold'>H</span>ub</h1>
        <form className='px-7 md:px-10' onSubmit={handleSubmit}>

          <div className='my-2'>
           <p className='text-xl font-mono text-gray-600'>Name</p>
           <input type="text" placeholder='Enter Name...' className='w-full border-1 py-2 px-4 
           rounded border-gray-300 placeholder:font-mono placeholder:text-gray-300
           focus:scale-105 transition-all ease-in-out delay-300 duration-500 focus:outline-red-500 focus:outline-1
           focus:shadow-2xl focus:shadow-indigo-500' name="name" value={values.name} onChange={handleChange} required/>
          </div>

            <div className='my-2'>
           <p className='text-xl font-mono text-gray-600'>Email</p>
           <input type="email" placeholder='Enter Email...' className='w-full border-1 py-2 px-4 
           rounded border-gray-300 placeholder:font-mono placeholder:text-gray-300
           focus:scale-105 transition-all ease-in-out delay-300 duration-500 focus:outline-red-500 focus:outline-1
           focus:shadow-2xl focus:shadow-indigo-500' name='email' value={values.email} onChange={handleChange} required/>
          </div>

            <div className='my-2'>
           <p className='text-xl font-mono text-gray-600'>Password</p>
           <input type="password" placeholder='Enter Password...' className='w-full border-1 py-2 px-4 
           rounded border-gray-300 placeholder:font-mono placeholder:text-gray-300
           focus:scale-105 transition-all ease-in-out delay-300 duration-500 focus:outline-red-500 focus:outline-1
           focus:shadow-2xl focus:shadow-indigo-500' name='password' value={values.password} onChange={handleChange} 
           minLength={6} maxLength={10} required/>
          </div>

          <div className='my-2'>
           <p className='text-xl font-mono text-gray-600'>Bio</p>
           <textarea  rows={4} cols={40} placeholder='Enter bio here...'
           className='w-full border-1 py-2 px-4 
           rounded  border-gray-300 placeholder:font-mono placeholder:text-gray-300
           focus:scale-105 transition-all ease-in-out delay-300 duration-500 focus:outline-red-500 focus:outline-1
           focus:shadow-2xl focus:shadow-indigo-500'name='bio' value={values.bio} onChange={handleChange} required></textarea>
          </div>

          <div  className="my-2">
           <p className='text-xl font-mono text-gray-600'>Avatar</p>
           <input type="file" placeholder='Upload avatar' className='w-65 border-1 py-2 px-4 
           rounded  font-mono text-gray-600
           focus:scale-105 transition-all ease-in-out delay-300 duration-500 focus:outline-red-500 focus:outline-1
           focus:shadow-2xl focus:shadow-indigo-500'accept="image/*" name="avatar"
           onChange={(e) => setValues({ ...values, avatar: e.target.files[0] })} required />
           {values.avatar && (
           <div className="mt-2">
          <img
            src={URL.createObjectURL(values.avatar)}
            alt="Avatar Preview"
           className="w-20 h-20 object-cover "
             />
           </div>
             )}
          </div>

          <div className='my-3 text-center'>
            <button type="submit" className='bg-indigo-500 py-2 px-7 rounded text-white
            font-bold hover:bg-indigo-300 transition-all ease-in-out delay-300 duration-500
            cursor-pointer'>
            Register
           </button>
          </div>
        </form>
        <div className='mx-10'>
           <Link to={"/login"} className='text-[15px] font-mono text-indigo-500'>
           already register ?</Link>
        </div>
     </div>
    </div>
  )
}

export default Register