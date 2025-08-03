import React from 'react'
import { useAppContext } from '../context/appContext'
import { useState } from 'react'
import axiosInstance from '../../axiosIntance.js'
import toast from 'react-hot-toast'
const AddPost = () => {
       const {user,post,setPost} = useAppContext()
        const handlePost = async() =>{
           try {
            if(post.length < 20){
              toast.error("Content length must be greater than 20 words")
              return
            }
            const response = await axiosInstance.post("/post/post",{post})
            if(response.data.success){
              toast.success(response.data.message)
              setPost("")
            }
           } catch (error) {
              toast.error(error?.response?.data?.message)
           }
        }
      
  return (
    <div className='py-5 px-5 md:px-10 w-full flex justify-center items-center'>
        <div>
           <h1 className='text-center  text-xl md:text-3xl font-light '>Hello
         <span className='text-red-700'> {user ? user?.name :""}, </span>
          welcome to linkHub
         </h1>
        <div>
          {
            user && (
               <div>
                <div className='my-2'>
                <textarea name="post" rows={4} cols={40} value={post}
                 onChange={(e)=>setPost(e.target.value)} className='w-80 md:w-120 border-1
                  px-3 py-3 bg-white rounded placeholder:text-gray-200 outline-none
                  border-gray-300
                 font-mono'
                placeholder='Type Something...'/>
                </div>

                <div className='text-center my-2'>
                 <button onClick={handlePost}
                className='px-8 py-2 bg-indigo-400 rounded text-black font-medium
                hover:bg-indigo-200 cursor-pointer' >Post</button>            
                </div>
      
               </div>
            )
          }
        </div>
        </div>
      </div>
  )
}

export default AddPost