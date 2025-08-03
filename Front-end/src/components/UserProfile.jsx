import React from 'react'
import Navbar from './Navbar'
import axiosInstance from '../../axiosIntance.js'
import { useState,useEffect } from 'react'
import PostCard from '../components/PostCard.jsx'
import toast from "react-hot-toast"
import { useParams } from 'react-router-dom'
const UserProfile = () => {
        const [selectedUser,setSelectedUser] = useState(null)
        const {id} = useParams()
        console.log(id)
        const selectedUserProfile = async() => {
          try {
            const response  = await axiosInstance.get(`/post/selected-user?id=${id}`)
            if(response.data.success){
              setSelectedUser(response.data.data)
            }
          } catch (error) {
            toast.error(error?.response?.data?.message)
          }
        }
        useEffect(()=>{
            selectedUserProfile()
        },[])
  return (
    <div>
      <Navbar/>
      <div className='px-5 h-auto w-full py-5 '>
        <div className='flex justify-center gap-3 md:gap-20 items-center h-60 w-full px-3 md:px-10 py-3'>
          <img src={selectedUser?.avatar} alt="user-img" className='w-20 md:w-40 h-20 md:h-40 rounded-full object-cover' />
          <div className='text-center'>
            <h1 className='text-xl md:text-4xl font-mono text-gray-500'>{selectedUser?.name}</h1>
            <h1 className='text-xl md:text-2xl font-medium text-gray-500 flex'>
            {selectedUser?.email}</h1>
            <h1 className='text-xl  font-medium text-gray-500'>Bio :{selectedUser?.bio}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile