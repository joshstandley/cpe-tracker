import React, { useEffect, useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import "../styles/credentialSelection.css";

function CredentialsSection() {
  const [credentials, setCredentials] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const response = await axiosWithAuth().get("/api/credentials");
        setCredentials(response.data);
      } catch (err) {
        console.error("Failed to load credentials:", err);
        setError("Failed to load credentials. Please try again.");
      }
    };

    fetchCredentials();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="credential-section">
      <h2>Select Your Credentials</h2>
      <ul>
        {credentials.map((cred) => (
          <li key={cred.id}>{cred.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default CredentialsSection;
