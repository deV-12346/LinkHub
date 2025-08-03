import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import axiosInstance from '../../axiosIntance'
import PostCard from './PostCard'

const AllPosts = () => {
      const {posts,setposts,post,setPost} = useAppContext()
      const fetchPosts = async() =>{
          try {
           const response = await axiosInstance.get("/post/allposts") 
           if(response.data.success){
            setposts(response.data.data)
            console.log(response.data.data)
           }
          } catch (error) {
            console.log(error.response?.data?.message)
          }
      }
      useEffect(()=>{
          fetchPosts()
      },[post])
  return (
    <div className="h-auto w-full px-10 py-5">
      <h1 className='text-2xl text-center text-indigo-400'>All Posts</h1>
      <div className='flex flex-wrap justify-center gap-6'>
        {
            posts.map((post)=>(
                  <PostCard key={post._id} post={post}  className="flex justify-center items-center"/>
            ))
        }
      </div>
    </div>
  )
}

export default AllPosts