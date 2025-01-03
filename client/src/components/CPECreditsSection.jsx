import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import "../styles/cpeCreditsSection.css";

function CPECreditsSection() {
  const [cpeCredits, setCpeCredits] = useState([]);
  const [formData, setFormData] = useState({
    credentialId: "",
    cpeTypeId: "",
    hours: "",
    deliveryMethod: "",
    dateCompleted: "",
  });
  const [credentials, setCredentials] = useState([]);
  const [cpeTypes, setCpeTypes] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [creditsResponse, credentialsResponse, cpeTypesResponse] = await Promise.all([
          axiosWithAuth().get("/api/cpe-credits"),
          axiosWithAuth().get("/api/user/credentials"),
          axiosWithAuth().get("/api/cpe-types"),
        ]);
        setCpeCredits(creditsResponse.data.credits || []);
        setCredentials(credentialsResponse.data || []);
        setCpeTypes(cpeTypesResponse.data.types || []);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosWithAuth().post("/api/cpe-credits", formData);
      setSuccess("CPE credit added successfully!");
      setError("");
      setFormData({
        credentialId: "",
        cpeTypeId: "",
        hours: "",
        deliveryMethod: "",
        dateCompleted: "",
      });
      const response = await axiosWithAuth().get("/api/cpe-credits");
      setCpeCredits(response.data.credits || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add CPE credit.");
      setSuccess("");
    }
  };

  return (
    <div className="cpe-credits-section">
      <h2>CPE Credits</h2>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form onSubmit={handleSubmit} className="cpe-credit-form">
        <div>
          <label htmlFor="credentialId">Credential</label>
          <select
            id="credentialId"
            name="credentialId"
            value={formData.credentialId}
            onChange={handleChange}
            required
          >
            <option value="">Select Credential</option>
            {credentials.map((cred) => (
              <option key={cred.id} value={cred.id}>
                {cred.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="cpeTypeId">CPE Type</label>
          <select
            id="cpeTypeId"
            name="cpeTypeId"
            value={formData.cpeTypeId}
            onChange={handleChange}
            required
          >
            <option value="">Select CPE Type</option>
            {cpeTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="hours">Hours</label>
          <input
            type="number"
            id="hours"
            name="hours"
            value={formData.hours}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="deliveryMethod">Delivery Method</label>
          <input
            type="text"
            id="deliveryMethod"
            name="deliveryMethod"
            value={formData.deliveryMethod}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="dateCompleted">Date Completed</label>
          <input
            type="date"
            id="dateCompleted"
            name="dateCompleted"
            value={formData.dateCompleted}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Add CPE Credit</button>
      </form>

      <div className="cpe-credits-list">
        <h3>Your CPE Credits</h3>
        <ul>
          {cpeCredits.map((credit) => (
            <li key={credit.id}>
              {credit.hours} hours of {credit.cpe_type} for {credit.credential} ({credit.delivery_method}) on {credit.date_completed}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CPECreditsSection;
