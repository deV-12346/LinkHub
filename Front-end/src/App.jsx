import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MyProfile from './pages/MyProfile'
import Login from './components/Login'
import Register from './components/Register'
import { Toaster } from 'react-hot-toast'
const App = () => {

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/my-profile' element={<MyProfile/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  )
}

export default App