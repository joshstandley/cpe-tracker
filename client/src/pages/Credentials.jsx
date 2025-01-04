import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

const Credentials = () => {
  const [credentials, setCredentials] = useState([]);
  const [newCredential, setNewCredential] = useState({
    abbreviation: '',
    full_name: '',
    description: '',
    organization_id: '',
    website: '',
    min_credits_per_year: '',
    renewal_cycle_years: '',
    total_credits_per_cycle: '',
    requires_ethics: false,
    other_requirements: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const response = await axiosWithAuth().get('/api/credentials');
        setCredentials(response.data);
      } catch (err) {
        setMessage('Error fetching credentials. Please log in again.');
      }
    };

    fetchCredentials();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCredential({
      ...newCredential,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosWithAuth().post('/api/credentials', newCredential);
      setMessage('Credential added successfully!');
      setNewCredential({
        abbreviation: '',
        full_name: '',
        description: '',
        organization_id: '',
        website: '',
        min_credits_per_year: '',
        renewal_cycle_years: '',
        total_credits_per_cycle: '',
        requires_ethics: false,
        other_requirements: ''
      });
      const response = await axiosWithAuth().get('/api/credentials');
      setCredentials(response.data);
    } catch (err) {
      setMessage('Error adding credential. Please try again.');
    }
  };

  return (
    <div>
      <h2>Credentials</h2>
      <form onSubmit={handleSubmit}>
        <label>Abbreviation:</label>
        <input type="text" name="abbreviation" value={newCredential.abbreviation} onChange={handleChange} required />
        <label>Full Name:</label>
        <input type="text" name="full_name" value={newCredential.full_name} onChange={handleChange} required />
        <label>Description:</label>
        <textarea name="description" value={newCredential.description} onChange={handleChange} required />
        <label>Organization ID:</label>
        <input type="number" name="organization_id" value={newCredential.organization_id} onChange={handleChange} required />
        <label>Website:</label>
        <input type="url" name="website" value={newCredential.website} onChange={handleChange} required />
        <label>Min Credits Per Year:</label>
        <input type="number" name="min_credits_per_year" value={newCredential.min_credits_per_year} onChange={handleChange} required />
        <label>Renewal Cycle Years:</label>
        <input type="number" name="renewal_cycle_years" value={newCredential.renewal_cycle_years} onChange={handleChange} required />
        <label>Total Credits Per Cycle:</label>
        <input type="number" name="total_credits_per_cycle" value={newCredential.total_credits_per_cycle} onChange={handleChange} required />
        <label>Requires Ethics:</label>
        <input type="checkbox" name="requires_ethics" checked={newCredential.requires_ethics} onChange={handleChange} />
        <label>Other Requirements:</label>
        <textarea name="other_requirements" value={newCredential.other_requirements} onChange={handleChange} />
        <button type="submit">Add Credential</button>
      </form>
      {message && <p>{message}</p>}
      <h3>Credentials</h3>
      <ul>
        {credentials.map(credential => (
          <li key={credential.credential_id}>
            {credential.abbreviation} - {credential.full_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Credentials;
