import React, { useEffect, useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import "../styles/credentialsSection.css";

function CredentialsSection() {
  const [credentials, setCredentials] = useState([]);
  const [selectedCredentials, setSelectedCredentials] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const response = await axiosWithAuth().get("/api/credentials");
        setCredentials(response.data);
      } catch (err) {
        console.error("Error fetching credentials:", err.message);
        setError("Failed to load credentials. Please try again.");
      }
    };

    fetchCredentials();
  }, []);

  const toggleSelection = (credentialId) => {
    setSelectedCredentials((prev) =>
      prev.includes(credentialId)
        ? prev.filter((id) => id !== credentialId)
        : [...prev, credentialId]
    );
  };

  const saveCredentials = async () => {
    try {
      await axiosWithAuth().post("/api/user/credentials", { selectedCredentials });
      alert("Credentials saved successfully!");
    } catch (err) {
      console.error("Error saving credentials:", err.message);
      alert("Failed to save credentials. Please try again.");
    }
  };

  return (
    <div className="credentials-section">
      <h2>Select Your Credentials</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="credentials-container">
        {credentials.map((credential) => (
          <div
            key={credential.id}
            className={`credential-card ${
              selectedCredentials.includes(credential.id) ? "selected" : ""
            }`}
            onClick={() => toggleSelection(credential.id)}
          >
            {credential.name}
          </div>
        ))}
      </div>
      <button className="save-button" onClick={saveCredentials}>
        Save Credentials
      </button>
    </div>
  );
}

export default CredentialsSection;
