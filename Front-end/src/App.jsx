import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MyProfile from './pages/MyProfile'
import Login from './components/Login'
import Register from './components/Register'
import { Toaster } from 'react-hot-toast'
import UserProfile from './components/UserProfile'
import ProtectedRoutes from './components/ProtectedRoutes'
const App = () => {

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/my-profile' element={<ProtectedRoutes>
           <MyProfile/>
         </ProtectedRoutes> }/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
         <Route path='/:id' element={<UserProfile/>}/>
      </Routes>
    </div>
  )
}

export default App