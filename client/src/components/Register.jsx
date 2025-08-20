import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("password", password);
    if(profileImage){
    formData.append("profile_image", profileImage);
    }
    try {
        await axios.post("http://localhost:5000/api/auth/register",formData,{
          headers:{"Content-Type":"multipart/form-data"},
          withCredentials: true, //transfer cookies
        });
        navigate("/login")
    } catch (error) {
        setError(error.response?.data?.message || "Registration Failed")   
    }
  };
  return (
    <div className='form-container'>
      <div className="form-card">
        <h2 className="form-tittle">Register</h2>
        {error && <p className='error'>{error}</p>}
        <div className="form-group">
          <input type="text" placeholder='Username' className='form-input' value={username} onChange={(e)=>setUsername(e.target.value)}/>
          <input type="email" placeholder='Email' className='form-input' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="Contact" placeholder='Contact (optional)' className='form-input' value={contact} onChange={(e)=>setContact(e.target.value)}/>
          <input type="password" placeholder='password' className='form-input' value={password} onChange={(e)=>setPassword(e.target.value)} />
          <input type="file" accept='image/*' onChange={(e)=>setProfileImage(e.target.files[0])} />
          <button className='form-button' onClick={handleSubmit}>Register</button>
        </div>
      </div>
    </div>
  )
}

export default Register





