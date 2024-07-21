import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './profile.css'; // Import the CSS file
import decode from '../../services/decode';

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      const { userId } = decode(token);
      try {
        const response = await Axios.get('http://localhost:8000/api/auth/getUser',{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data) {
          setProfileInfo({
            name: response.data.data.name,
            email: response.data.data.email,
            role: response.data.data.role,
          });
        } else {
          console.error('User data not found:', response.data);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!profileInfo.email) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={`https://robohash.org/${profileInfo.name}.png?set=set4`}
            alt="Profile"
            className="profile-image"
          />
          <div className="profile-info">
            <h2 className="profile-name">
              {profileInfo.name} {profileInfo.role === 'admin' && <span className="admin-dot"></span>}
            </h2>
            <p className="profile-email">{profileInfo.email}</p>
            <p className="profile-role">{profileInfo.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
