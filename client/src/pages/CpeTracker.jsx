import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

const CpeTracker = () => {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({
    title: '',
    date: '',
    provider: '',
    credit_hours: '',
    cpe_type_id: '',
    credential_id: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axiosWithAuth().get('/api/cpe_activities');
        setActivities(response.data);
      } catch (err) {
        setMessage('Error fetching activities. Please log in again.');
      }
    };

    fetchActivities();
  }, []);

  const handleChange = (e) => {
    setNewActivity({
      ...newActivity,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosWithAuth().post('/api/cpe_activities', newActivity);
      setMessage('Activity added successfully!');
      setNewActivity({
        title: '',
        date: '',
        provider: '',
        credit_hours: '',
        cpe_type_id: '',
        credential_id: ''
      });
      const response = await axiosWithAuth().get('/api/cpe_activities');
      setActivities(response.data);
    } catch (err) {
      setMessage('Error adding activity. Please try again.');
    }
  };

  return (
    <div>
      <h2>CPE Tracker</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={newActivity.title} onChange={handleChange} required />
        <label>Date:</label>
        <input type="date" name="date" value={newActivity.date} onChange={handleChange} required />
        <label>Provider:</label>
        <input type="text" name="provider" value={newActivity.provider} onChange={handleChange} required />
        <label>Credit Hours:</label>
        <input type="number" name="credit_hours" value={newActivity.credit_hours} onChange={handleChange} required />
        <label>CPE Type ID:</label>
        <input type="number" name="cpe_type_id" value={newActivity.cpe_type_id} onChange={handleChange} required />
        <label>Credential ID:</label>
        <input type="number" name="credential_id" value={newActivity.credential_id} onChange={handleChange} required />
        <button type="submit">Add Activity</button>
      </form>
      {message && <p>{message}</p>}
      <h3>Activities</h3>
      <ul>
        {activities.map(activity => (
          <li key={activity.activity_id}>
            {activity.title} - {activity.date} - {activity.provider} - {activity.credit_hours} hours
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CpeTracker;
