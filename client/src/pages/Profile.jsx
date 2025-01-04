import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosWithAuth().get('/api/profile');
        setProfile(response.data);
      } catch (err) {
        setMessage('Error fetching profile. Please log in again.');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosWithAuth().put('/api/profile', profile);
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage('Error updating profile. Please try again.');
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input type="text" name="first_name" value={profile.first_name || ''} onChange={handleChange} required />
        <label>Last Name:</label>
        <input type="text" name="last_name" value={profile.last_name || ''} onChange={handleChange} required />
        <label>Email:</label>
        <input type="email" name="email" value={profile.email || ''} onChange={handleChange} required />
        <button type="submit">Update Profile</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Profile;
