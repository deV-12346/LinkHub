import React, { useState } from 'react'
import Navabar from './Navabar'
import { useAppContext } from '../context/appContext'
import axiosInstance from '../../axiosIntance'
import { useEffect } from 'react'
import PostCard from './PostCard'
import toast from "react-hot-toast"
const MyProfile = () => {
  const {user} = useAppContext()
  const [user_Posts,setUser_Posts] = useState([])
  const fetchUserPost = async() => {
    try {
      const response  = await axiosInstance.get("/post/user-posts")
      if(response.data.success){
        setUser_Posts(response.data.data)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  useEffect(()=>{
      fetchUserPost()
  },[])
  return (
    <div>
      <Navabar/>
      <div className='px-5 h-auto w-full py-5 '>
        <div className='flex justify-center gap-3 md:gap-20 items-center h-60 w-full px-3 md:px-10 py-3'>
          <img src={user.avatar} alt="user-img" className='w-20 md:w-40 h-20 md:h-40 rounded-full object-cover' />
          <div className='text-center'>
            <h1 className='text-xl md:text-4xl font-mono text-gray-500'>{user.name}</h1>
            <h1 className='text-xl md:text-2xl font-medium text-gray-500 flex'>
            {user.email}</h1>
            <h1 className='text-xl  font-medium text-gray-500'>Bio :{user.bio}</h1>
          </div>
        </div>
        {
        user_Posts.length === 0 ?
             <h1 className='text-center mt-10 text-gray-500 text-xl font-medium'>
              You haven't posted anything yet.
              </h1>
             :
           <div className='flex flex-wrap justify-center gap-6'>
            {
            user_Posts.map((post)=>(
                  <PostCard key={post._id} post={post} />
            ))
           }
          </div>
        }
      </div>
    </div>
  )
}

export default MyProfile