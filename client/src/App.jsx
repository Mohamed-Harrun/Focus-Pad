import React, { useContext } from 'react'
import { Navigate, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Dashboard from './components/Dashboard'
import "./App.css" 
import ProtectedRoutes from './utils/ProtectedRoutes'
import { AuthContext } from './components/context/AuthContext'

const App = () => {
  const {user, loading} = useContext(AuthContext)
  if(loading){
    return <div>loading...</div>
  }
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={user? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path='/login' element={user? <Navigate to="/dashboard" /> : <Login/>} />
        <Route path='/register' element={<Register/>} />
        
        <Route path='/dashboard' element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
        <Route path='/profile' element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
      </Routes>
    </>
  )
}

export default App