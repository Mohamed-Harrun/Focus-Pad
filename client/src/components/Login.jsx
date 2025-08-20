import React, { useContext, useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { AuthContext } from './context/AuthContext';
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {user, login, loading} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const success = await login({username, password});
    if(success){
      navigate("/dashboard")
    }
    else{
      setError("Login failed: Invalid response from server")
    }
    try {
      console.log("success")
    } catch (error) {
      setError(error.response?.data?.message || "Registration Failed")
    }
    if(loading){
      return <div >Loading...</div>
    }
  }
  return (
    <div>        
          <div className='form-container'>
            <div className="form-card">
              <h2 className="form-tittle">Login</h2>
              {error && <p className='error'>{error}</p>}
              <p className='error'></p>
              <div className="form-group">
                <input type="text" placeholder='Username or Email' className='form-input' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <input type="password" placeholder='password' className='form-input' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className='form-button' onClick={handleSubmit}>Login</button>
                <p>
                  Don't have an account? <Link to={"/register"}>Sign Up</Link>
                </p>
                
              </div>
            </div>
     </div>
        
      
      
    </div>
  )
}

export default Login