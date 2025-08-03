import React from 'react'
import axiosInstance from '../../axiosIntance'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/appContext'
import { useNavigate ,Link, NavLink} from 'react-router-dom'

const Navbar = () => {
      const {user,setUser} = useAppContext()
      const navigate  = useNavigate()
      const handleClick = async(e) =>{
            try {
                  const response = await axiosInstance.post("/user/logout")
                  if(response.data.success){
                        toast.success(response.data.message)
                        setUser(null)
                        localStorage.removeItem("user")
                        setTimeout(()=>{
                          navigate("/login")
                        },3000)
                  }
            } catch (error) {
                  toast.error(error?.response?.data?.message)
            }
      }
  return (
    <div className='bg-gradient-to-l from-indigo-400 to-blue-100 w-full py-3 flex justify-evenly items-center'>
       <Link to="/" className=' text-[20px] md:text-2xl  font-medium text-center'>
         <span className='text-red-500 font-bold'>L</span>
          ink
        <span className='text-red-500 font-bold'>H</span>ub
        </Link>
        <nav className='flex gap-5 md:gap-10'>
            <NavLink className={({isActive})=> isActive ? "text-white underline" :
             "font-medium hover:scale-110 transition-all ease-in-out delay-500 duration-500 hover:text-red-400"} to="/">Home</NavLink>
            <NavLink className={({isActive}) => isActive ? "text-white underline" 
            : "font-medium hover:scale-110 transition-all ease-in-out delay-500 duration-500 hover:text-red-400"} to="/my-profile">My Profile</NavLink>
        </nav>
        <div>
        {
            user ? 
            <button onClick={handleClick} className='bg-blue-300 px-4 md:px-6 py-2 rounded 
            hover:bg-blue-100 cursor-pointer font-medium text-black hover:scale-105
            transition-all ease-in-out delay-500 duration-500'>Logout</button>
            :
            <button onClick={()=>navigate("/login")} className='bg-blue-300  px-4 md:px-6 py-2 rounded 
            hover:bg-blue-100 cursor-pointer font-medium 
            transition-all ease-in-out delay-500 duration-800 hover:scale-105'>Login </button>
        }
        </div>
    </div>
  )
}

export default Navbar