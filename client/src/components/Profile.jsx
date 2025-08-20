import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Profile = () => {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const fetchUser = async()=>{
    try {
        const response = await axios.get("http://localhost:5000/api/auth/me",{
          withCredentials: true
        });
        setUser(response.data)
        console.log(user);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch user data")
    }
  }
  
  useEffect(()=>{
    fetchUser();
  },[]);
  if(!user&&!error){
    return <div>Loading...</div>
  }
  const handleImageUpload = async()=>{
    const formData = new FormData();
    formData.append("profile_image", profileImage);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/upload-profile-image",formData,{
        headers:{"Content-Type":"multipart/form-data"},
        withCredentials:true,
      })
      setUser({...user,profile_image:response.data.profile_image})
      setProfileImage(null);
    } catch (error) {
      console.log(error);
      setError("Failed to upload image")
    }
  }
  return (
    <div className='profile-container'>
      <div className="profile-card">
        <h4 className='profile-tittle'>Profile</h4>
        {error && <p className='error'>{error}</p>}
        <div className="profile-info">
          <p>
            <strong>Username:</strong>  {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Contact:</strong> {user.contact || "N/A"}
          </p>
          {user.profile_image && <img src={`http://localhost:5000${user.profile_image}`} alt='profile'/>}
          <input type="file" accept='image/*' onChange={(e)=>setProfileImage(e.target.files[0])} />
          { profileImage && <button onClick={handleImageUpload} className='form-button'>Upload profile Image</button> }
        </div>

      </div>
    </div>
  )
}

export default Profile
