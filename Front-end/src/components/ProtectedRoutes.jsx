import React from 'react'
import { useAppContext } from '../context/appContext'
import { Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const ProtectedRoutes = ({children}) => {
      const {user} = useAppContext()
      if(!user){
            return <Navigate to="/login"/>
      }
  return children
}

export default ProtectedRoutes