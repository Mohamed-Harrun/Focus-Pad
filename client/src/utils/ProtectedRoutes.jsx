import React, { useContext } from 'react'
import {AuthContext} from '../components/context/AuthContext'
import { Navigate } from 'react-router-dom';
const ProtectedRoutes = ({children}) => {
    const {user} = useContext(AuthContext);
  return user ? children : <Navigate to="/" />
}

export default ProtectedRoutes